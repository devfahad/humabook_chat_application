import {doc, onSnapshot} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import {db} from "../firebase";

type User = {
  displayName: string;
  photoURL: string;
  uid: number | string;
};

const Chats = () => {
  const [chats, setChats] = useState([]);

  const {currentUser}: any = useContext(AuthContext);
  const {dispatch}: any = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc: any) => {
        return setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  // console.log("chats array: ", Object.entries(chats));

  const handleSelect = (userInfo: User) => {
    dispatch({type: "CHANGE_USER", payload: userInfo});
    // console.log("userInfo: ", userInfo);
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a: any, b: any)=>b[1].date - a[1].date).map((chat: any) => (
        <div
          className="p-[10px] flex items-center gap-[10px] text-white cursor-pointer hover:bg-navbarBg"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
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
            <p className="text-[13px] text-lightgray">{chat[1].lastMessage?.text ? chat[1].lastMessage?.text : "Attachment"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
