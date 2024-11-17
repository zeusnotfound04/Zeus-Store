import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineHome , AiOutlineShoppingCart, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShopping} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import "./Navbar.css"



const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)



    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }


    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    const closeSidebar = () => {
        setShowSidebar(false)
    }

  return (
    <div style={{zIndex:999}} className={`${showSidebar ? "hidden" : "flex" } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black  w-[4%] hover:w-[15%] h-[100vh] fixed`}
    id='navigation-container'
    >
        <div className="flex flex-col justify-center space-y-4">
            <Link to="/" className='flex items-center transition-transform  hover:translate-x-2'>
                <AiOutlineHome className='mr-2 mt-[3rem]' size={26} />
                <span className="hidden nav-items-name mt-[3rem]">Home</span>
            </Link>
        </div>


    </div>
  )
}

export default Navbar