export default function Input( { type, defaultValue, onInput } ) {
    return (
        <div className="input-component">
            <input className="input-component-input" type={type} onInput={onInput} defaultValue={defaultValue} />
            <label className="input-component-label">
                Test1
            </label>
        </div>
        
        
    );
};