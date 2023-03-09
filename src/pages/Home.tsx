import React from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="bg-dimBlue h-screen flex items-center justify-center">
      <div className="rounded-[10px] w-[75%] h-[80%] flex overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
