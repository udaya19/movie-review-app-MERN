import React from "react";

const FormInput = ({ name, placeholder, label, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="text-dark-subtle">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 border-dark-subtle w-full 
      outline-none focus:border-white p-1"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
