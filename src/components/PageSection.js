import "../style/pageSection.scss";


const PageSection = ({children, backgroundImage, artCredit, backgroundImageStyle}) => {
    const dynamicStyle = {}

    // if (backgroundImage) dynamicStyle.backgroundImage = `url(${backgroundImage})`;

    return (
        <div className={"section" + (backgroundImage ? " section-background-image" : "")}>
            <div className="section-content page-constrained-width">
                {children}
            </div>
            {artCredit ? <div class="section-art-credit">{artCredit}</div> : ""}
            {backgroundImage ? <div class="section-background-image" style={{backgroundImage: `url(${backgroundImage})`, ...backgroundImageStyle}}></div> : ""}
        </div>
    );
}

export default PageSection;