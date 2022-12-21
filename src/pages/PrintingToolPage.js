import "../style/printingToolPage.scss";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import Button from "../components/Button";
import { jsPDF } from "jspdf";
import PrintToolInput from "../components/PrintToolInput";
import Select from "../components/Select";

//Constants
const MAX_IMAGE_COUNT = 9;
const CORNER_WIDTH = 3;
const CORNER_LENGTH = 30;
const PREVIEW_SCALE = 1 / 6;
const LOCAL_STORAGE_KEY = "printToolDocProps";

const PrintingToolPage = () => {
    const getDocProps = () => {
        let loadedDocProps = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (!loadedDocProps) {
            loadedDocProps = {}
        }
        return {
            ppi: loadedDocProps.ppi || 600,
            pageWidth: loadedDocProps.pageWidth || 5100,
            pageHeight: loadedDocProps.pageHeight || 6600,
            cardWidth: loadedDocProps.cardWidth || 1500,
            cardHeight: loadedDocProps.cardHeight || 2100,
            bleedX: loadedDocProps.bleedX || 0,
            bleedY: loadedDocProps.bleedY || 0,
            marginX: loadedDocProps.marginX || 2,
            marginY: loadedDocProps.marginY || 2,
            imgIncludesBleedEdge: loadedDocProps.imgIncludesBleedEdge || false,
            bleedEdgeColor: loadedDocProps.bleedEdgeColor || "black",
            useCuttingAids: loadedDocProps.useCuttingAids || true,
            cutLinesAtop: loadedDocProps.cutLinesAtop || false,
        };
    }

    const [docProps, setDocProps] = useState(getDocProps());
    const [images, setImages] = useState([]);
    const [canDownload, setCanDownload] = useState(true);
    const [defaultValKey, setDefaultValKey] = useState(1);

    let keyCounter = 0;
    const autoKey = () => {
        keyCounter ++;
        return keyCounter + defaultValKey;
    }

    const pxToDocUnits = (px) => {
        return px / docProps.ppi * 72;
    }

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

    const updatePreview = (imagesToPreview = images) => {
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
        const pdf = new jsPDF({
            orientation: (docProps.pageWidth < docProps.pageHeight ? "p" : "l"),
            unit: "pt", 
            format: [docProps.pageWidth / docProps.ppi * 72, docProps.pageHeight / docProps.ppi * 72]
        });
        pdf.setDrawColor(0);
        // Compute positions
        const pageLayout = computePageLayout();
        // Collect image information
        const imgs = computeImageInfo(pageLayout);
        // Draw the cut lines below the images
        if (docProps.useCuttingAids && !docProps.cutLinesAtop) for (let img of imgs) await drawCutLinePDF(pdf, pageLayout, img.index, img.pos);
        // Draw the images
        for (let img of imgs) await drawCardPDF(pdf, img.pos, img.image);
        // Draw the cut lines above the images
        if (docProps.useCuttingAids && docProps.cutLinesAtop) for (let img of imgs) await drawCutLinePDF(pdf, pageLayout, img.index, img.pos);
        // Draw the cut corners
        if (docProps.useCuttingAids) for (let img of imgs) await drawCutCornerPDF(pdf, img.pos);
        // Return the pdf
        return pdf;
    }

    const drawCardPDF = async (pdf, pos, image) => {
        // Bleed edge (if not in the image)
        if (!docProps.imgIncludesBleedEdge) {
            pdf.setFillColor(docProps.bleedEdgeColor);
            pdf.rect(pxToDocUnits(pos.bleed.x), pxToDocUnits(pos.bleed.y), pxToDocUnits(pos.bleed.width), pxToDocUnits(pos.bleed.height), "F");
        }
        // Card image
        await pdf.addImage(image, "PNG", pxToDocUnits(pos.img.x), pxToDocUnits(pos.img.y), pxToDocUnits(pos.img.width), pxToDocUnits(pos.img.height));
    }

    const drawCutLinePDF = async (pdf, pageLayout, index, pos) => {
        pdf.setFillColor("black");
        // First card in a row
        if (index % pageLayout.numCardsX === 0) {
            pdf.rect(0, pxToDocUnits(pos.cut.y - 1), pxToDocUnits(docProps.pageWidth), pxToDocUnits(2), "F");
            pdf.rect(0, pxToDocUnits(pos.cut.y + pos.cut.height - 1), pxToDocUnits(docProps.pageWidth), pxToDocUnits(2), "F");
        }
        // First card in a column
        if (Math.floor(index / pageLayout.numCardsX) % pageLayout.numCardsY === 0) {
            pdf.rect(pxToDocUnits(pos.cut.x - 1), 0, pxToDocUnits(2), pxToDocUnits(docProps.pageHeight), "F");
            pdf.rect(pxToDocUnits(pos.cut.x + pos.cut.width - 1), 0, pxToDocUnits(2), pxToDocUnits(docProps.pageHeight), "F");
        }
    }

    const drawCutCornerPDF = async (pdf, pos) => {
        pdf.setFillColor("magenta");
        pdf.rect(pxToDocUnits(pos.cut.x), pxToDocUnits(pos.cut.y), pxToDocUnits(CORNER_LENGTH), pxToDocUnits(CORNER_WIDTH), "F");
        pdf.rect(pxToDocUnits(pos.cut.x), pxToDocUnits(pos.cut.y), pxToDocUnits(CORNER_WIDTH), pxToDocUnits(CORNER_LENGTH), "F");
        pdf.rect(pxToDocUnits(pos.cut.x + pos.cut.width - CORNER_LENGTH), pxToDocUnits(pos.cut.y + pos.cut.height - CORNER_WIDTH), pxToDocUnits(CORNER_LENGTH), pxToDocUnits(CORNER_WIDTH), "F");
        pdf.rect(pxToDocUnits(pos.cut.x + pos.cut.width - CORNER_WIDTH), pxToDocUnits(pos.cut.y + pos.cut.height - CORNER_LENGTH), pxToDocUnits(CORNER_WIDTH), pxToDocUnits(CORNER_LENGTH), "F");
        pdf.setFillColor("green");
        pdf.rect(pxToDocUnits(pos.cut.x + pos.cut.width - CORNER_LENGTH), pxToDocUnits(pos.cut.y), pxToDocUnits(CORNER_LENGTH), pxToDocUnits(CORNER_WIDTH), "F");
        pdf.rect(pxToDocUnits(pos.cut.x + pos.cut.width - CORNER_WIDTH), pxToDocUnits(pos.cut.y), pxToDocUnits(CORNER_WIDTH), pxToDocUnits(CORNER_LENGTH), "F");
        pdf.rect(pxToDocUnits(pos.cut.x), pxToDocUnits(pos.cut.y + pos.cut.height - CORNER_WIDTH), pxToDocUnits(CORNER_LENGTH), pxToDocUnits(CORNER_WIDTH), "F");
        pdf.rect(pxToDocUnits(pos.cut.x), pxToDocUnits(pos.cut.y + pos.cut.height - CORNER_LENGTH), pxToDocUnits(CORNER_WIDTH), pxToDocUnits(CORNER_LENGTH), "F");
    }

    const computePageLayout = () => {
        // The total width a card takes up includes its size, bleed, and margin
        const totalCardWidth = docProps.cardWidth + 2 * docProps.bleedX + docProps.marginX;
        const totalCardHeight = docProps.cardHeight + 2 * docProps.bleedY + docProps.marginY;
        // The page can only fit some number of cards in each direction
        const numCardsX = Math.floor(docProps.pageWidth / totalCardWidth);
        const numCardsY = Math.floor(docProps.pageHeight / totalCardHeight);
        // The page margin equals half of the remaining space
        const pageMarginX = Math.floor((docProps.pageWidth - numCardsX * totalCardWidth + docProps.marginX) / 2);
        const pageMarginY = Math.floor((docProps.pageHeight - numCardsY * totalCardHeight + docProps.marginY) / 2);

        return {
            totalCardWidth: totalCardWidth,
            totalCardHeight: totalCardHeight,
            numCardsX: numCardsX,
            numCardsY: numCardsY,
            pageMarginX: pageMarginX,
            pageMarginY: pageMarginY
        };
    }

    const computeImageInfo = (pageLayout) => {
        const imgs = [];
        for (const [index, image] of images.entries()) {
            // If the number of images exceeds the viewable area, quit early
            if (index >= pageLayout.numCardsX * pageLayout.numCardsY) break;
            imgs.push({
                image: image,
                index: index,
                pos: computePositions(index, pageLayout)
            });
        }
        return imgs;
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

    const updateDocProps = (newProps, rerenderDefaultInputs = false) => {
        for (let key in newProps) {
            docProps[key] = newProps[key];
        }
        setDocProps(docProps);
        updatePreview();
        if (rerenderDefaultInputs) setDefaultValKey(defaultValKey + keyCounter);
    }

    const commonInputProps = {
        docProps: docProps,
        setDocProps: setDocProps,
        updatePreview: updatePreview
    }

    const saveDocProps = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(docProps));
    }

    const loadDocProps = () => {
        setDocProps(getDocProps());
        setDefaultValKey(defaultValKey + keyCounter);
        updatePreview();
    }

    const resetDocProps = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        loadDocProps();
    }

    useEffect(() => {
        updatePreview();
    }, []);

    return (
        <div className="">
            <div className="printingToolPage page-constrained-width">
                <h1 className="printingToolTitle">Kyle's Print Page Tool</h1>
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
                <div className="printingToolForm">
                    <h2 className="center">Layout Options</h2>
                    <PrintToolInput key={autoKey()} className="inputPair" name="Page Width (px)" docPropsKey="pageWidth" type="number" {...commonInputProps}></PrintToolInput>
                    <PrintToolInput key={autoKey()} className="inputPair" name="Page Height (px)" docPropsKey="pageHeight" type="number" {...commonInputProps}></PrintToolInput>
                    <PrintToolInput key={autoKey()} className="inputPair" name="Card Width (px)" docPropsKey="cardWidth" type="number" {...commonInputProps}></PrintToolInput>
                    <PrintToolInput key={autoKey()} className="inputPair" name="Card Height (px)" docPropsKey="cardHeight" type="number" {...commonInputProps}></PrintToolInput>
                    <PrintToolInput key={autoKey()} className="inputPair" name="Horizontal Bleed (px)" docPropsKey="bleedX" type="number" {...commonInputProps}></PrintToolInput>
                    <PrintToolInput key={autoKey()} className="inputPair" name="Vertical Bleed (px)" docPropsKey="bleedY" type="number" {...commonInputProps}></PrintToolInput>
                    <PrintToolInput key={autoKey()} className="inputPair" name="Horizontal Margin (px)" docPropsKey="marginX" type="number" {...commonInputProps}></PrintToolInput>
                    <PrintToolInput key={autoKey()} className="inputPair" name="Vertical Margin (px)" docPropsKey="marginY" type="number" {...commonInputProps}></PrintToolInput>
                    <PrintToolInput key={autoKey()} name="Pixels Per Inch" docPropsKey="ppi" type="number" {...commonInputProps}></PrintToolInput>
                    <label key={autoKey()} className="printingToolCheckbox">Use Cutting Guides:
                        <input type="checkbox" defaultChecked={docProps.useCuttingAids} onInput={(e) => updateDocProps({"useCuttingAids": e.target.checked})} />
                    </label>
                    <label key={autoKey()} className="printingToolCheckbox">Place Cut Lines Above Images:
                        <input type="checkbox" defaultChecked={docProps.cutLinesAtop} onInput={(e) => updateDocProps({"cutLinesAtop": e.target.checked})} />
                    </label>
                    <label key={autoKey()} className="printingToolCheckbox">Bleed edge included in image:
                        <input type="checkbox" defaultChecked={docProps.imgIncludesBleedEdge} onInput={(e) => updateDocProps({"imgIncludesBleedEdge": e.target.checked})} />
                    </label>
                    <h2 className="center">Save/Load Layout Options</h2>
                    <Button onClick={saveDocProps} disabled={!canDownload}>Save Current Layout</Button>
                    <Button onClick={loadDocProps} disabled={!canDownload}>Load Saved Layout</Button>
                    <Button onClick={resetDocProps} disabled={!canDownload}>Reset Saved Layout</Button>
                    <h2 className="center">Preset Page/Card Sizes</h2>
                    <Select className="inputPair" label="Page Size" onChange={(e) => {
                        const [width, height] = e.target.value.split(",").map((num) => {
                            return Math.round(parseFloat(num) * docProps.ppi);
                        });
                        updateDocProps({
                            pageWidth: width,
                            pageHeight: height
                        }, true);
                    }}>
                        <option disabled={true} selected={true}>Select a Page Size</option>
                        <option value="8.5,11">Letter (8.5 x 11 in)</option>
                        <option value="8.26772,11.6929">A4 (210 x 297 mm)</option>
                    </Select>
                    <Select className="inputPair" label="Card Size" onChange={(e) => {
                        const [width, height] = e.target.value.split(",").map((num) => {
                            return Math.round(parseFloat(num) * docProps.ppi);
                        });
                        updateDocProps({
                            cardWidth: width,
                            cardHeight: height
                        }, true);
                    }}>
                        <option disabled={true} selected={true}>Select a Card Size</option>
                        <option value="2.5,3.5">Poker (2.5 x 3.5 in)</option>
                        <option value="2.48031,3.46457">Poker (63 x 88 mm)</option>
                    </Select>
                    <Button onClick={() => {
                        updateDocProps({
                            pageWidth: docProps.pageHeight,
                            pageHeight: docProps.pageWidth
                        }, true);
                    }} disabled={!canDownload}>Toggle Page Orientation</Button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrintingToolPage;