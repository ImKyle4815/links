const Link = ( props ) => {
    return (
        <a className="link-component" href={props.url} target={props.sameTab ? "" : "_blank"} rel="noreferrer">
			<img src={props.img} alt="O" className={props.backdrop ? "link-img-backdrop" : ""} />
			<span>{props.text}</span>
		</a>
    );
};

export default Link;