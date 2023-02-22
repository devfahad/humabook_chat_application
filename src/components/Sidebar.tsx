import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Users from "./Users";

const Sidebar = () => {
  return (
    <div className="w-[33%] bg-sidebarBg">
      <Navbar />
      <Search />
      <Users />
    </div>
  );
};

export default Sidebar;
