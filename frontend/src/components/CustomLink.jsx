import React from "react";
import { Link } from "react-router-dom";
const CustomLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="dark:text-dark-subtle dark:hover:text-white transition text-primary hover:scale-110"
    >
      {children}
    </Link>
  );
};

export default CustomLink;
