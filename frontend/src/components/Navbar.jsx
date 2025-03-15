import { NavLink } from "react-router-dom";
import {assets}  from "../assets/assets";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
       <img className="w-44 cursor-pointer" src={assets.logo} alt="logo" /> 
       <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink>
            <li className="py-1">HOME</li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] rounded-xl w-4/5 m-auto hidden" />
        </NavLink>
        <NavLink>
            <li className="py-1">ALL DOCTORS</li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] rounded-xl w-4/5 m-auto hidden" />
        </NavLink>
        <NavLink>
            <li className="py-1">ABOUT</li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] rounded-xl w-4/5 m-auto hidden" />
        </NavLink>
        <NavLink>
            <li className="py-1">CONTACT</li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] rounded-xl w-4/5 m-auto hidden" />
        </NavLink>
       
       </ul>
       <div>
        <button>Create account</button>
       </div>
    </div>
  )
}

export default Navbar