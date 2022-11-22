import "../style/printingToolPage.scss";
import Footer from "../components/Footer";
import { useState } from "react";
import { Page, Text, Image, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { FileUploader } from "react-drag-drop-files";

    //Constants
    const aidWidth = 2;
    const aidOffset = aidWidth / 2;
    const MAX_IMAGE_COUNT = 9;

const PrintingToolPage = () => {
    const [docProps, setPageProps] = useState({
        ppi: 600,
        pageWidth: 5100,
        pageHeight: 6600,
        cardWidth: 1500,
        cardHeight: 2100,
        cardPaddingX: 0,
        cardPaddingY: 0,
        cardMarginX: 20,
        cardMarginY: 20,
        imgIncludesBleedEdge: false,
        bleedEdgeColor: "black",
        useCuttingAids: true
    });
    const [images, setImages] = useState([]);
    let debounce;
    let imagesToAdd = [];

    const uploadImages = (newImagesFileList) => {
        for (let newImageIndex in newImagesFileList) {
            if (newImageIndex !== "length" && newImageIndex !== "item") {
                readImage(newImagesFileList[newImageIndex]);
            }
        }
    }

    const readImage = (imageFile) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            queueImage(reader.result);
        }
        reader.onerror = () => {
            console.log("An error occurred while reading a file: ", reader);
        }
        reader.readAsDataURL(imageFile);
    }

    const queueImage = (img) => {
        if (debounce) {
            clearTimeout(debounce);
        }
        imagesToAdd.push(img);
        debounce = setTimeout(addImages, 500);
    }

    const addImages = () => {
        if (imagesToAdd.length >= MAX_IMAGE_COUNT) {
            setImages(imagesToAdd.slice(0, MAX_IMAGE_COUNT));
        } else if (images.length + imagesToAdd.length >= MAX_IMAGE_COUNT) {
            setImages(images.slice(images.length - (MAX_IMAGE_COUNT - imagesToAdd.length), images.length).concat(imagesToAdd));
        } else {
            setImages([...images].concat(imagesToAdd));
        }
        imagesToAdd = [];
    }

    const renderImage = (image, index) => {
        const totalCardWidth = docProps.cardWidth + 2 * docProps.cardPaddingX + docProps.cardMarginX;
        const totalCardHeight = docProps.cardHeight + 2 * docProps.cardPaddingY + docProps.cardMarginY;
        const numCardsX = Math.floor(docProps.pageWidth / totalCardWidth);
        const numCardsY = Math.floor(docProps.pageHeight / totalCardHeight);
        if (index > numCardsX * numCardsY) return (<></>);
        const pageMarginX = Math.floor((docProps.pageWidth - numCardsX * totalCardWidth) / 2);
        const pageMarginY = Math.floor((docProps.pageHeight - numCardsY * totalCardWidth) / 2);


        // console.log(numCardsX, numCardsY, pageMarginX, pageMarginY, totalCardWidth, totalCardHeight)


        const imageStyle = {
            position: "absolute",
            left: pxToDocUnits(pageMarginX + (index % numCardsX) * totalCardWidth + Math.floor(docProps.cardMarginX / 2) + docProps.cardPaddingX),
            top: pxToDocUnits(pageMarginY + (Math.floor(index / numCardsX) % numCardsY) * totalCardHeight + Math.floor(docProps.cardMarginY / 2) + docProps.cardPaddingY),
            width: pxToDocUnits(docProps.cardWidth),
            height: pxToDocUnits(docProps.cardHeight)
        };

        // console.log(imageStyle);
        console.log(index);

        return (
            <Image
                key={index}
                source={image}
                style={imageStyle}
            />
        );
    }

    const pxToDocUnits = (px) => {
        return (px / docProps.ppi) + "in";
    }

    return (
        <div>
            <div className="printingTool page-constrained-width">
                <div>
                    <h1>Kyle's Print Page Tool</h1>
                    <p>Easily prepare printable PDFs for any card game.</p>
                </div>
                <div className="upload">
                    <FileUploader 
                        multiple={true}
                        handleChange={uploadImages}
                        types={["JPG", "PNG"]}
                    />
                </div>
                <div className="pdfDoc">
                    <PDFViewer showToolbar={false}>
                        <Document>
                            <Page
                                style={{
                                    size: [docProps.pageWidth, docProps.pageHeight],
                                    dpi: docProps.ppi,
                                    style: { padding:0, margin:0 }
                                }}>
                                {images.map(renderImage)}
                            </Page>
                        </Document>
                    </PDFViewer>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrintingToolPage;