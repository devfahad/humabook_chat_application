import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <div className="bg-offWhite p-[10px] h-[calc(100%-100px)] overflow-y-scroll">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;