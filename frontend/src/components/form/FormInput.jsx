import React from "react";

const FormInput = ({ name, placeholder, label, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="dark:text-dark-subtle text-primary">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle w-full 
      outline-none dark:focus:border-white p-1 focus:border-primary"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
