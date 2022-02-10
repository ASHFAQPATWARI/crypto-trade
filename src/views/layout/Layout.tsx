import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Login } from "views/login";

function Layout() {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <header>
        <Link to="/">Home</Link>
        <Link to="/trade">Trade</Link>
      </header>
      {isOpen && <Login />}
      <Outlet />
    </div>
  );
}

export default Layout;
