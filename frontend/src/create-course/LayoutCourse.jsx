import React, { useState } from "react";
import Header from "../dashboard/_components/Header";
import { Outlet } from "react-router-dom";
import { UserInputContext } from "@/_context/UserInputContext";

function LayoutCourse() {
  const [userCourseInput, setUserCourseInput] = useState({
    Category: "",    
  });

  return (
    <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
      <div className="flex-1">
        <Header />
        <div className="p-10">
          <Outlet /> 
        </div>
      </div>
    </UserInputContext.Provider>
  );
}

export default LayoutCourse;
