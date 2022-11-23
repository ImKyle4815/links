export default function Input( { label, type, defaultValue, onInput, className } ) {
    return (
        <div className={"input-component " + (className || "")}>
            <input className="input-component-input" type={type} onInput={onInput} defaultValue={defaultValue} />
            <label className="input-component-label">
                {label}
            </label>
        </div>
    );
};