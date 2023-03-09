import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import logo from '../assets/logo.png'
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Navbar = () => {
  const {currentUser}: any = useContext(AuthContext)

  return (
    <div className="flex items-center justify-between bg-offWhite text-dimGray p-[10px] h-[50px]">
      <img src={logo} alt="logo" className="max-h-[27px]" />
      <div className="flex items-center gap-2">
        <img src={currentUser.photoURL} alt={currentUser.displayName} className="h-[30px] w-[30px] rounded-full object-cover border-[1px] border-solid border-darkBlue" />
        <span className="text-[13px]">{currentUser.displayName}</span>
        <button onClick={()=> signOut(auth)} className="bg-darkBlue text-offWhite text-[12px] py-1 px-2 rounded-sm hover:bg-navbarBg">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
