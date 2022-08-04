import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../index";
import "./Content.scss";

const Content = () => {
  return (
    <div className="content">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Content;
