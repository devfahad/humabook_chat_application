import React, {useContext} from "react";
import Messages from "./Messages";

import Cam from "../assets/cam.png";
import Add from "../assets/add.png";
import More from "../assets/more.png";
import Input from "./Input";
import {ChatContext} from "../context/ChatContext";

const Chat = () => {
  const {data}: any = useContext(ChatContext);

  return (
    <div className="w-[67%] ">
      <div className="h-[50px] bg-darkBlue flex items-center justify-between p-[10px]">
        <span className="text-offWhite text-[14px]">
          {data.user?.displayName}
        </span>
        <div className="flex gap-[10px]">
          <img
            src={Cam}
            alt="camera"
            className="h-[24px] object-cover cursor-pointer"
          />
          <img
            src={Add}
            alt="add people"
            className="h-[24px] object-cover cursor-pointer"
          />
          <img
            src={More}
            alt="more options"
            className="h-[24px] object-cover cursor-pointer"
          />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
