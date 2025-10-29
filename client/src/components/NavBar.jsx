import React from "react";
import logo from "../assets/logo2.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Cartcontext } from "../context/CartContextCore";

const NavBar = () => {
  const { totalItems } = useContext(Cartcontext);

  return (
    <nav className='h-24 flex items-center justify-between px-6 md:px-12 shadow-md bg-[#B6AE9F]'>
      <Link to='/'>
        <img className='h-16 rounded-xl' src={logo} alt='logo' />
      </Link>
      <h1 className='m-auto text-4xl font-semibold'>Nexora Cart Assignment</h1>
      <Link to='/cart'>
        <button className='h-10 bg-[#B6AE9F] text-xl px-4  rounded-lg transition duration-300 ease-in-out hover:bg-[#C5C7BC] hover:text-white cursor-pointer'>
          Cart
          {totalItems > 0 && `(${totalItems})`}
        </button>
      </Link>
    </nav>
  );
};

export default NavBar;
