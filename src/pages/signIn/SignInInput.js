import React from "react";

const SignInInput = ({ id, label, type = "text", value, onChange }) => {
    return (
        <div className="input-wrapper">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} value={value} onChange={onChange} />
        </div>
    );
};
export default SignInInput;
