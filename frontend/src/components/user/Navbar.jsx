import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks/index";
const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
  return (
    <div className="bg-secondary">
      <div className="text-white">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="./logo.png" className="h-10" alt="" />
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <button
                onClick={toggleTheme}
                className="bg-dark-subtle p-1 rounded"
              >
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
            {/* {isLoggedIn ? (
              <button onClick={handleLogout}>LogOut</button>
            ) : (
              <Link to="/signin">
                <li className="text-white">Login</li>
              </Link>
            )} */}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-white ">
                Logout
              </button>
            ) : (
              <Link className="text-white " to="/signin">
                Login
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
