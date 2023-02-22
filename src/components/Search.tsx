import React from "react";

const curUserImg = "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHdvbWVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

const Search = () => {
  return (
    <div className="border-b-[1px] border-solid border-gray">
      <div className="p-[10px]">
        <input type="text" placeholder="Find a user" className="bg-transparent text-white outline-none placeholder:text-[12px] text-[12px]" />
      </div>
      <div className="p-[10px] flex items-center gap-[10px] text-white cursor-pointer hover:bg-navbarBg">
        <img src={curUserImg} alt="Jessica" className="w-[45px] h-[45px] rounded-full object-cover" />
        <div className="userChatinfo">
          <span className="text-[15px] font-bold">Jessica</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
