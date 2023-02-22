import React from "react";
import logo from '../assets/logo.png'

const curUserImg = "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHdvbWVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-offWhite text-dimGray p-[10px] h-[50px]">
      <img src={logo} alt="logo" className="max-h-[24px]" />
      <div className="flex items-center gap-2">
        <img src={curUserImg} alt="Jessica" className="h-[30px] w-[30px] rounded-full object-cover border-[1px] border-solid border-darkBlue" />
        <span className="text-[12px]">Jessica</span>
        <button className="bg-darkBlue text-offWhite text-[10px] py-1 px-2 rounded-sm hover:bg-navbarBg">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
