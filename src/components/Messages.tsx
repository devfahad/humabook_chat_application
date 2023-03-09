import {doc, onSnapshot} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {ChatContext} from "../context/ChatContext";
import {db} from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const {data}: any = useContext(ChatContext);

  useEffect(() => {
    // Get messages from firestore chats collection
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  // console.log("messages", messages)

  return (
    <div className="bg-offWhite p-[10px] h-[calc(100%-100px)] overflow-y-scroll">
      {messages.map((msg: any) => (
        <Message message={msg} key={msg.id} />
      ))}
    </div>
  );
};

export default Messages;
