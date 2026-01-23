import React from "react";
import logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-5 shadow-sm">
      <img
        src={logo}
        alt="Company Logo"
        className="w-[150px] h-auto object-contain"
      />
      <Button onClick={() => navigate("/signup")}>
        Get Started
      </Button>
    </header>
  );
}

export default Header;


