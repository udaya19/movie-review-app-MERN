import React from "react";
import { ImSpinner } from "react-icons/im";
const Submit = ({ value, busy }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-full h-10 dark:bg-white dark:text-black text-white bg-black hover:opacity-80 cursor-pointer"
      >
        {busy ? <ImSpinner className="animate-spin" /> : value}
      </button>
    </div>
  );
};

export default Submit;
