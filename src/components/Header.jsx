import React from "react";
import chefIcon from "../assets/chef.png";

function Header() {
  return (
    <header className="header">
      <img src={chefIcon} alt="Chef Claude" />
      <h1>Chef Tacci</h1>
    </header>
  );
}

export default Header;
