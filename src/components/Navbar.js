import React from "react";
import "./Styles/Navbar.css";

function Navbar() {
  return (
    <div className="nav">
      <a href="/">home</a>
      <a href="/login">Login</a>
      <a href="/registration">Registration</a>
    </div>
  );
}

export default Navbar;
