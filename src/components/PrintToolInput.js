import Input from "./Input";

export default function PrintToolInput( { name, docPropsKey, type, docProps, setDocProps, updatePreview, className } ) {    
    const updateDocProps = (e) => {
        let newDocProps = {};
        Object.assign(newDocProps, docProps);
        newDocProps[docPropsKey] = (type === "checkbox" ? e.target.checked : (type === "number" ? parseInt(e.target.value) : e.target.value));
        setDocProps(newDocProps);
        updatePreview();
    }

    let defaults = {defaultValue: docProps[docPropsKey]};
    if (type === "checked") defaults = {defaultChecked: docProps[docPropsKey]};

    return (
        <Input {...defaults} {...{className, type}} label={name} onInput={updateDocProps}></Input>
    );
};