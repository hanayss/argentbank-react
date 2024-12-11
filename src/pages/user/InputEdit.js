import React from "react";

const InputEdit = ({
    label,
    value,
    onChange = () => {},
    disabled = false,
    className = "",
}) => {
    return (
        <div>
            <label>{label}:</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={className}
            />
        </div>
    );
};
export default InputEdit;
