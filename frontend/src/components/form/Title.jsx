import React from "react";

const Title = ({ children }) => {
  return (
    <h1 className="dark:text-white text-primary text-xl font-semibold text-center">
      {children}
    </h1>
  );
};

export default Title;
