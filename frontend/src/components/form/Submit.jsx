import React from "react";

const Submit = ({ value }) => {
  return (
    <div>
      <input
        type="submit"
        className="w-full p-1 dark:bg-white dark:text-black text-white bg-black hover:opacity-80 cursor-pointer"
        value={value}
      />
    </div>
  );
};

export default Submit;
