import { Timestamp } from "firebase/firestore";
import React, {useContext, useEffect, useRef} from "react";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";

const Message = ({message}: any) => {
  const {currentUser}: any = useContext(AuthContext);
  const {data}: any = useContext(ChatContext);

  // scroll down when a message is send
  const divRef: any = useRef<HTMLDivElement>();

  useEffect(() => {
    divRef.current?.scrollIntoView({behavior: "smooth"});
  }, [message]);

  return (
    <div
      ref={divRef}
      className={`flex ${
        message.senderId === currentUser.uid && "flex-row-reverse"
      } gap-[20px] py-1`}
    >
      <div className="flex flex-col">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="user"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <span className="text-[11px] pt-1 font-normal text-gray-500">
          {message.date.toDate().toLocaleTimeString('en-US')}
        </span>
      </div>
      <div
        className={`max-w-[80%] flex flex-col gap-[10px] ${
          message.senderId === currentUser.uid && "items-end"
        }`}
      >
        {message.text && (
          <p
            className={`${
              message.senderId === currentUser.uid
                ? "bg-darkBlue text-white rounded-tr-none"
                : "bg-white rounded-tl-none"
            } py-[10px] mt-2 px-[20px] max-w-mc text-[15px] rounded-[10px]`}
          >
            {message.text}
          </p>
        )}
        {message.img && (
          <img className="py-[10px] max-w-xs" src={message.img} alt="" />
        )}
      </div>
    </div>
  );
};

export default Message;
