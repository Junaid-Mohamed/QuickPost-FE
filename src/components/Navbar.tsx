import React from "react";
import { Link } from "react-router-dom";


const Navbar: React.FC = () =>{
    return(
        <div className="bg-white py-3 px-20">
           <Link to="/" className=" text-1xl sm:text-3xl cursor-pointer" ><span className="text-red-400" >Quick</span>Post</Link> 
        </div>
    )
}

export default Navbar;