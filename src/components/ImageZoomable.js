import React, { useState } from 'react';

const ImageZoomable = ( props ) => {
    const [zoomed, setZoom] = useState(0);

    return (
        <div className="image-zoomable-component" href={props.url} target={props.sameTab ? "" : "_blank"} rel="noreferrer">
			<img src={props.src} alt={props.alt} className={props.className} onClick={() => { setZoom(true) }} />
            {zoomed ? <div onClick={() => { setZoom(false) }}>
                <img src={props.src} alt={props.alt} onClick={() => { setZoom(false) }} />
            </div> : ""}
		</div>
    );
};

export default ImageZoomable;