import React from "react";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../features/Auth/authSlice.ts";


const Navbar: React.FC = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearUser());
        toast.success("Logged out")
        navigate("/login")
    }

    return(
        <div className="bg-white flex justify-between py-3 sm:px-20 px-7">
           <Link to="/" className=" text-1xl sm:text-3xl cursor-pointer" ><span className="text-red-400" >Quick</span>Post</Link> 
           <IoIosLogOut onClick={handleLogout} className="text-xl sm:text-3xl cursor-pointer hover:text-red-400" />
        </div>
    )
}

export default Navbar;