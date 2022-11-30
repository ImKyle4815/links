export default function Input( { label, type, defaultValue, onInput, className, inputId } ) {
    return (
        <div className={"input-component " + (className || "")}>
            <input className="input-component-input" type={type} onInput={onInput} defaultValue={defaultValue} id={inputId} />
            <label className="input-component-label">
                {label}
            </label>
        </div>
    );
};