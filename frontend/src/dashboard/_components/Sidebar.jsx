import React from "react";
import logo from "../../assets/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const Menu = [
    { id: 1, name: "Home", icon: <AiOutlineHome />, path: "/dashboard" },
  ];

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md bg-white">
      <img
        src={logo}
        alt="Company Logo"
        className="w-[150px] h-auto object-contain"
      />
      <hr className="my-5" />
      <ul>
        {Menu.map((item) => (
          <li key={item.id}>
            <Link
              to={item.path}
              className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer 
                hover:bg-gray-100 hover:text-black rounded-lg  mb-3
                ${currentPath === item.path ? "bg-gray-100 text-black" : ""}`}
            >
              <div className="text-2xl">{item.icon}</div>
              <h2 className="text-lg font-medium">{item.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
  
    </div>
  );
};

export default Sidebar;
