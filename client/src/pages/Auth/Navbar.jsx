import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineHome , AiOutlineShoppingCart, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShopping} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { logout } from '../../redux/features/auth/authSlice'
import "./Navbar.css"



const Navbar = () => {

  const {useInfo} = useSelector(state => state.auth)

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
  
    const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };
  
    const closeSidebar = () => {
      setShowSidebar(false);
    };
  
    const navItems = [
      { to: "/", Icon: AiOutlineHome, text: "Home" },
      { to: "/shop", Icon: AiOutlineShopping, text: "SHOP" },
      { to: "/cart", Icon: AiOutlineShoppingCart, text: "CART" },
      { to: "/favorite", Icon: FaHeart, text: "FAVORITE" },
    ];
  
    // Inline NavItem component
    const NavItem = ({ to, Icon, text }) => (
      <Link to={to} className="flex items-center transition-transform hover:translate-x-2">
        <Icon className="mr-2 mt-[3rem]" size={26} />
        <span className="nav-item-name mt-[3rem]">{text}</span>
      </Link>
    );

    const dispatch = useDispatch()
    const navigate = useNavigate()

 
    const [logoutApiCall] = useLoginMutation();

    const loginHandler = async()=>{
      try {
        await logoutApiCall().unwrap()
        dispatch(logout())
        navigate("/login")
      } catch (error) {
        console.error(error)
      }
    }


    return (
      <div
        style={{ zIndex: 999 }}
        className={`${
          showSidebar ? 'hidden' : 'flex'
        } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
        id="navigation-container"
      >
        <div className="flex flex-col justify-center space-y-4">
          {navItems.map(({ to, Icon, text }, index) => (
            <NavItem key={index} to={to} Icon={Icon} text={text} />
          ))}
        </div>

        <div className="relative">
          <button onClick={toggleDropdown} className='flex items-center text-gray-800 focus:outline-none'></button>
        </div>
        <ul>
            <li>
                <Link to="/login" className='flex items-center transition transform hover:translate-x-2'>
                    <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                    <span className="nav-item-name mt-[3rem]">LOGIN</span>
                </Link>
            </li>
        </ul>
      </div>
    );
  };
  
  export default Navbar;