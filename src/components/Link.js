const Link = ( { url, sameTab, img, backdrop, text } ) => {
    return (
        <a className="link-component" href={url} target={sameTab ? "" : "_blank"} rel="noreferrer">
			<img src={img} alt="O" className={backdrop ? "link-img-backdrop" : ""} />
			<span>{text}</span>
		</a>
    );
};

export default Link;