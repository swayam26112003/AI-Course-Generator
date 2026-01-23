import React from "react";
import favi from "../../assets/favi.png";

function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <img
        src={favi}
        className="w-[150px] h-auto object-contain"
      />
    </div>
  );
}

export default Header;
