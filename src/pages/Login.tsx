import React from "react";
import logo from '../assets/logo.png'
import addAvatar from '../assets/addAvatar.png'

const Login = () => {
  return (
    <div className="bg-dimGray h-screen flex justify-center items-center">
      <div className="bg-white px-[20px] py-[60px] rounded-[10px] flex items-center flex-col gap-2">
        <img src={logo} alt="logo" />
        <span className="text-darkBlue text-[14px]">Login</span>
        <form className="flex flex-col gap-[15px] text-[14px]">
          <input type="email" placeholder="Email" className="p-4 border-b-[1px] min-w-[280px] border-dimBlue focus:border-darkBlue focus:outline-none" />
          <input type="password" placeholder="Password" className="p-4 border-b-[1px] min-w-[280px] border-dimBlue focus:border-darkBlue focus:outline-none" />
          
          <button className="bg-buttonBg text-white p-[10px] font-bold hover:bg-darkBlue mt-[10px]">Sign in</button>
        </form>
        <p className="text-darkBlue text-[12px] mt-[10px]">You don't have an account? Register</p>
      </div>
    </div>
  );
};

export default Login;
