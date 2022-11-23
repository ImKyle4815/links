export default function Button( { children, onClick, disabled } ) {
    return (
        <button className="button-component" onClick={onClick} disabled={disabled}>
			{children}
		</button>
    );
};