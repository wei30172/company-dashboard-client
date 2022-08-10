import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../index";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
