import React from "react";
import { commonInputClasses } from "../utils/theme";

const LiveSearch = () => {
  return (
    <div className="relative">
      <input
        type="text"
        className={`border-2 rounded p-1 text-lg ${commonInputClasses}`}
        placeholder="Search Profile"
      />
      <div className="absolute right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 mt-1 overflow-auto">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus
          tenetur sed impedit ipsum esse labore eos sint quo ex aspernatur ipsa
          aliquam facere, vero reprehenderit amet iste distinctio veniam
          suscipit.
        </p>
      </div>
    </div>
  );
};

export default LiveSearch;
