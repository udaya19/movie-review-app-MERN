import React from "react";
import { BsFillSunFill } from "react-icons/bs";
const Navbar = () => {
  return (
    <div className="bg-secondary">
      <div className="text-white">
        <div className="flex justify-between items-center">
          <img src="./logo.png" className="h-10" alt="" />
          <ul className="flex items-center space-x-4">
            <li>
              <button className="bg-dark-subtle p-1 rounded">
                <BsFillSunFill className="text-secondary" />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 bg-transparent outline-none focus:border-white"
                placeholder="Search..."
              />
            </li>
            <li className="text-white">Login</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
