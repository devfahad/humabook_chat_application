import React from "react";
import Img from "../assets/img.png";
import Attach from "../assets/attach.png";

const Input = () => {
  return (
    <div className="h-[50px] p-[10px] bg-white flex items-center justify-between gap-[10px]">
      <input
        type="text"
        placeholder="Type here..."
        className="w-[75%] outline-none text-[14px] text-navbarBg placeholder:text-[14px]"
      />
      <div className="w-[25%] flex items-center justify-around gap-[10px]">
        <img
          src={Attach}
          alt="attachment"
          className="w-[24px] object-cover cursor-pointer"
        />
        <input type="file" id="fileAttach" className="hidden" />
        <label htmlFor="fileAttach">
          <img
            src={Img}
            alt="gallery"
            className="w-[24px] object-cover cursor-pointer"
          />
        </label>
        <button className="py-[5px] px-[15px] text-white bg-darkBlue hover:bg-navbarBg rounded-sm">
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
