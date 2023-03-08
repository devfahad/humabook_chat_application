import {doc, onSnapshot} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {db} from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const {currentUser}: any = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
        return setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  console.log("chats array: ", Object.entries(chats));

  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat) => (
        <div
          className="p-[10px] flex items-center gap-[10px] text-white cursor-pointer hover:bg-navbarBg"
          key={chat[0]}
        >
          <img
            src={chat[1].userInfo.photoURL}
            alt="Jessica"
            className="w-[45px] h-[45px] rounded-full object-cover"
          />
          <div className="userChatinfo">
            <span className="text-[15px] font-medium">
              {chat[1].userInfo.displayName}
            </span>
            <p className="text-[13px] text-lightgray">hello</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
