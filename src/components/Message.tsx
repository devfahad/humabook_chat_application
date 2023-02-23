import React from "react";

const imgURL =
  "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHdvbWVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

const Message = () => {
  return (
    <div className="flex gap-[20px]">
      <div className="flex flex-col">
        <img src={imgURL} alt="user" className="w-[40px] h-[40px] rounded-full object-cover" />
        <span className="text-[12px] font-light text-gray-500">Just now</span>
      </div>
      <div className="max-w-[80%] flex flex-col gap-[10px]">
        <p className="bg-white py-[10px] px-[20px] rounded-[10px] rounded-tl-none max-w-mc text-[15px]">Hello</p>
        {/* <img src={imgURL} alt="user" /> */}
      </div>
    </div>
  );
};

export default Message;
