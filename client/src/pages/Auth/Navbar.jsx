import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShopping,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setDropdownOpen(false); // Close dropdown on logout
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const navItems = [
    { to: "/", Icon: AiOutlineHome, text: "Home" },
    { to: "/shop", Icon: AiOutlineShopping, text: "SHOP" },
    { to: "/cart", Icon: AiOutlineShoppingCart, text: "CART" },
    { to: "/favorite", Icon: FaHeart, text: "FAVORITE" },
  ];

  const NavItem = ({ to, Icon, text }) => (
    <Link
      to={to}
      className="flex items-center space-x-2 py-2 px-3 transition-transform hover:translate-x-2"
    >
      <Icon size={26} />
      <span className="nav-item-name">{text}</span>
    </Link>
  );

  return (
    <>
      {!showSidebar && (
        <div
          style={{ zIndex: 999 }}
          className="flex xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed"
          id="navigation-container"
        >
          <div className="flex flex-col justify-center space-y-4">
            {navItems.map(({ to, Icon, text }, index) => (
              <NavItem key={index} to={to} Icon={Icon} text={text} />
            ))}
          </div>

          <div className="relative dropdown-container">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-gray-800 focus:outline-none"
            >
              {userInfo ? (
                <span className="text-white">{userInfo.username}</span>
              ) : (
                <span className="text-white">Guest</span>
              )}
              {userInfo && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 ${
                    dropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      dropdownOpen
                        ? "M5 15l7-7 7 7"
                        : "M19 9l-7 7-7-7"
                    }
                  />
                </svg>
              )}
            </button>

            {dropdownOpen && (
              <ul
                className={`absolute right-0 mb-2 bg-white text-gray-600 shadow-lg rounded-md ${
                  dropdownOpen ? "block" : "hidden"
                }`}
                style={{
                  bottom: "100%", // Opens above the button
                  minWidth: "12rem",
                }}
              >
                {userInfo?.isAdmin && (
                  <>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/productlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/categorylist"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Users
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>

          {!userInfo && (
            <ul>
              <li>
                <Link
                  to="/login"
                  className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                >
                  <AiOutlineLogin className="mr-2" size={26} />
                  <span className="nav-item-name">LOGIN</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                >
                  <AiOutlineUserAdd size={26} />
                  <span className="nav-item-name">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
