export default function Select( { label, onChange, className, children } ) {
    return (
        <div className={"input-component " + (className || "")}>
            <select className="input-component-input" onChange={onChange} >
                {children}
            </select>
            <label className="input-component-label">
                {label}
            </label>
        </div>
    );
};