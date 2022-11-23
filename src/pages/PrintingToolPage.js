import "../style/printingToolPage.scss";
import Footer from "../components/Footer";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Button from "../components/Button";
import { jsPDF } from "jspdf";

//Constants
const MAX_IMAGE_COUNT = 9;
const CORNER_WIDTH = 3;
const CORNER_LENGTH = 30;
const PREVIEW_SCALE = 1 / 6;

const PrintingToolPage = () => {
    const [docProps, setDocProps] = useState({
        ppi: 600,
        pageWidth: 5100,
        pageHeight: 6600,
        cardWidth: 1500,
        cardHeight: 2100,
        bleedX: 0,
        bleedY: 0,
        marginX: 2,
        marginY: 2,
        imgIncludesBleedEdge: false,
        bleedEdgeColor: "black",
        useCuttingAids: true
    });
    const [images, setImages] = useState([]);
    const [canDownload, setCanDownload] = useState(true);

    const uploadImages = (newImagesFileList) => {
        setCanDownload(false);
        const readers = [];
        for (let newImageIndex in newImagesFileList) {
            if (newImageIndex !== "length" && newImageIndex !== "item") {
                readers.push(readFileAsDataURL(newImagesFileList[newImageIndex]));
            }
        }
        Promise.all(readers).then(addImages)
    }

    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            let fr = new FileReader();
            fr.onload = () => {
                const img = new Image();
                img.onload = () => {
                    resolve(img);
                }
                img.src = fr.result;
            }
            fr.onerror = () => {
                reject(fr);
            }
            fr.readAsDataURL(file)
        });
    }

    const addImages = (imagesToAdd) => {
        let newImages;
        if (imagesToAdd.length >= MAX_IMAGE_COUNT) {
            newImages = imagesToAdd.slice(0, MAX_IMAGE_COUNT);
        } else if (images.length + imagesToAdd.length >= MAX_IMAGE_COUNT) {
            newImages = images.slice(images.length - (MAX_IMAGE_COUNT - imagesToAdd.length), images.length).concat(imagesToAdd);
        } else {
            newImages = [...images].concat(imagesToAdd);
        }
        updatePreview(newImages);
        setImages(newImages);
        setCanDownload(true);
    }

    const updatePreview = (imagesToPreview) => {
        const canvas = document.querySelector("canvas");
        if (!canvas) return;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = docProps.pageWidth * PREVIEW_SCALE;
        canvas.height = docProps.pageHeight * PREVIEW_SCALE;
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        const pageLayout = computePageLayout();
        for (const [index, image] of imagesToPreview.entries()) {
            const pos = computePositions(index, pageLayout);
            context.drawImage(image, pos.img.x * PREVIEW_SCALE, pos.img.y * PREVIEW_SCALE, pos.img.width * PREVIEW_SCALE, pos.img.height * PREVIEW_SCALE);
        }
    }

    const generatePdf = async () => {
        // Create the PDF
        const pdf = new jsPDF("p", "px", [docProps.pageWidth, docProps.pageHeight]);
        pdf.setDrawColor(0);
        // Compute positions
        const pageLayout = computePageLayout();
        // Draw the lines and possibly the bleed
        for (const [index, image] of images.entries()) {
            const pos = computePositions(index, pageLayout);
            // cut lines
            if (docProps.useCuttingAids) {
                pdf.setFillColor("black");
                // First card in a row
                if (index % pageLayout.numCardsX === 0) {
                    pdf.rect(0, pos.cut.y - 1, (docProps.pageWidth), 2, "F");
                    pdf.rect(0, pos.cut.y + pos.cut.height - 1, (docProps.pageWidth), 2, "F");
                }
                // First card in a column
                if (Math.floor(index / pageLayout.numCardsY) % pageLayout.numCardsY === 0) {
                    pdf.rect(pos.cut.x - 1, 0, 2, (docProps.pageHeight), "F");
                    pdf.rect(pos.cut.x + pos.cut.width - 1, 0, 2, (docProps.pageHeight), "F");
                }
            }
            // Bleed edge (if not in the image)
            if (!docProps.imgIncludesBleedEdge) {
                pdf.setFillColor(docProps.bleedEdgeColor);
                pdf.rect(pos.bleed.x, pos.bleed.y, pos.bleed.width, pos.bleed.height, "F");
            }
            // Card image
            await pdf.addImage(image, "PNG", pos.img.x, pos.img.y, pos.img.width, pos.img.height);
            // Cut guides (corners)
            if (docProps.useCuttingAids) {
                pdf.setFillColor("magenta");
                pdf.rect(pos.cut.x, pos.cut.y, CORNER_LENGTH, CORNER_WIDTH, "F");
                pdf.rect(pos.cut.x, pos.cut.y, CORNER_WIDTH, CORNER_LENGTH, "F");
                pdf.rect(pos.cut.x + pos.cut.width - CORNER_LENGTH, pos.cut.y + pos.cut.height - CORNER_WIDTH, CORNER_LENGTH, CORNER_WIDTH, "F");
                pdf.rect(pos.cut.x + pos.cut.width - CORNER_WIDTH, pos.cut.y + pos.cut.height - CORNER_LENGTH, CORNER_WIDTH, CORNER_LENGTH, "F");
                pdf.setFillColor("green");
                pdf.rect(pos.cut.x + pos.cut.width - CORNER_LENGTH, pos.cut.y, CORNER_LENGTH, CORNER_WIDTH, "F");
                pdf.rect(pos.cut.x + pos.cut.width - CORNER_WIDTH, pos.cut.y, CORNER_WIDTH, CORNER_LENGTH, "F");
                pdf.rect(pos.cut.x, pos.cut.y + pos.cut.height - CORNER_WIDTH, CORNER_LENGTH, CORNER_WIDTH, "F");
                pdf.rect(pos.cut.x, pos.cut.y + pos.cut.height - CORNER_LENGTH, CORNER_WIDTH, CORNER_LENGTH, "F");
            }
        }
        // Return the pdf
        return pdf;
    }

    const computePageLayout = () => {
        // The total width a card takes up includes its size, bleed, and margin
        const totalCardWidth = docProps.cardWidth + 2 * docProps.bleedX + docProps.marginX;
        const totalCardHeight = docProps.cardHeight + 2 * docProps.bleedY + docProps.marginY;
        // The page can only fit some number of cards in each direction
        const numCardsX = Math.floor(docProps.pageWidth / totalCardWidth);
        const numCardsY = Math.floor(docProps.pageHeight / totalCardHeight);
        // The page margin equals half of the remaining space
        const pageMarginX = Math.floor((docProps.pageWidth - numCardsX * totalCardWidth - docProps.marginX) / 2);
        const pageMarginY = Math.floor((docProps.pageHeight - numCardsY * totalCardHeight - docProps.marginY) / 2);

        return {
            totalCardWidth: totalCardWidth,
            totalCardHeight: totalCardHeight,
            numCardsX: numCardsX,
            numCardsY: numCardsY,
            pageMarginX: pageMarginX,
            pageMarginY: pageMarginY
        };
    }

    const computePositions = (index, { totalCardWidth, totalCardHeight, numCardsX, numCardsY, pageMarginX, pageMarginY }) => {
        if (index > numCardsX * numCardsY) return undefined;
        // A card's starting position is based on its index, size, and page margin
        const startingX = pageMarginX + (index % numCardsX) * totalCardWidth;
        const startingY = pageMarginY + (Math.floor(index / numCardsX) % numCardsY) * totalCardHeight;
        // The "fullSpace" is the space taken up by the card and its bleed edge
        const bleedSpace = {
            x: (startingX),
            y: (startingY),
            width: (docProps.cardWidth + 2 * docProps.bleedX),
            height: (docProps.cardHeight + 2 * docProps.bleedY)
        };
        // The "cuts" refer to the actual card size only, where the cut guides should be placed
        const cuts = {
            x: (startingX + docProps.bleedX),
            y: (startingY + docProps.bleedY),
            width: (docProps.cardWidth),
            height: (docProps.cardHeight),
        };
        // Return the computed results
        return {
            bleed: (docProps.imgIncludesBleedEdge ? undefined : bleedSpace),
            cut: cuts,
            img: (docProps.imgIncludesBleedEdge ? bleedSpace : cuts)
        };
    }

    const downloadPdf = async () => {
        setCanDownload(false);
        generatePdf().then((pdf) => {
            pdf.save("print")
            setCanDownload(true);
        });
    }

    const updateDocProps = (field, value) => {
        docProps[field] = value;
        setDocProps(docProps);
        updatePreview(images);
    }

    console.log(docProps);

    return (
        <div className="">
            <div className="printingToolPage page-constrained-width">
                <h1 className="printingToolTitle">Kyle's Print Page Tool</h1>
                <p style={{textAlign: "center"}}>(Work in progress)</p>
                <div className="upload">
                    <FileUploader 
                        multiple={true}
                        handleChange={uploadImages}
                        types={["JPG", "PNG"]}
                    />
                </div>
                <div className="previewContainer">
                    <canvas width="5" height="7" className="preview"></canvas>
                    <p className="previewText">PREVIEW</p>
                </div>
                <div style={{marginLeft:"auto", marginRight:"auto", maxWidth:"512px"}}>
                    <Button onClick={downloadPdf} disabled={!canDownload}>Download PDF</Button>
                </div>
                <p style={{textAlign: "center"}}>(Please excuse the *ugly* form)</p>
                <form className="printingToolForm">
                    <label className="printingToolFormLabel">Page width:
                        <input type="number" defaultValue={docProps.pageWidth} onInput={(e) => updateDocProps("pageWidth", parseInt(e.target.value))} />
                    </label>
                    <label className="printingToolFormLabel">Page height:
                        <input type="number" defaultValue={docProps.pageHeight} onInput={(e) => updateDocProps("pageHeight", parseInt(e.target.value))} />
                    </label>
                    <br />
                    <label className="printingToolFormLabel">Card width:
                        <input type="number" defaultValue={docProps.cardWidth} onInput={(e) => updateDocProps("cardWidth", parseInt(e.target.value))} />
                    </label>
                    <label className="printingToolFormLabel">Card height:
                        <input type="number" defaultValue={docProps.cardHeight} onInput={(e) => updateDocProps("cardHeight", parseInt(e.target.value))} />
                    </label>
                    <br />
                    <label className="printingToolFormLabel">Bleed width:
                        <input type="number" defaultValue={docProps.bleedX} onInput={(e) => updateDocProps("bleedX", parseInt(e.target.value))} />
                    </label>
                    <label className="printingToolFormLabel">Bleed height:
                        <input type="number" defaultValue={docProps.bleedY} onInput={(e) => updateDocProps("bleedY", parseInt(e.target.value))} />
                    </label>
                    <br />
                    <label className="printingToolFormLabel">Margin:
                        <input type="number" defaultValue={docProps.marginX} onInput={(e) => {updateDocProps("marginX", parseInt(e.target.value));updateDocProps("marginY", parseInt(e.target.value))}} />
                    </label>
                    <br />
                    <label className="printingToolFormLabel">PPI:
                        <input type="number" defaultValue={docProps.ppi} onInput={(e) => updateDocProps("ppi", parseInt(e.target.value))} />
                    </label>
                    <br />
                    <label className="printingToolFormLabel">Use Cutting Guides:
                        <input type="checkbox" defaultChecked={docProps.useCuttingAids} onInput={(e) => updateDocProps("useCuttingAids", parseInt(e.target.checked))} />
                    </label>
                    <br />
                    <label className="printingToolFormLabel">Bleed edge included in image:
                        <input type="checkbox" defaultChecked={docProps.imgIncludesBleedEdge} onInput={(e) => updateDocProps("imgIncludesBleedEdge", parseInt(e.target.checked))} />
                    </label>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default PrintingToolPage;