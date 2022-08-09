import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropsFromRedux, authConnector } from "../../store/auth/connector";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import { SwitchMode, NavMenu } from "../index";
import logo from "../../assets/logo.svg";
import "./Navbar.scss";

const Navbar = ({ accessToken, logoutRequest }: PropsFromRedux) => {
  const navigate = useNavigate();
  const [showMobMenu, setShowMobMenu] = useState(false);

  const menuItems = [
    {
      name: "Home",
      href: "/home",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("auth");
    logoutRequest();
  };

  return (
    <div className="navbar">
      {/* logo */}
      <a href="/">
        <img src={logo} style={{ width: "40px" }} alt="logo" />
      </a>
      <div className="navbar_menu flex">
        {/* mobile or pc menu */}
        <ul className={showMobMenu ? "navbar_menu_mobile" : "navbar_menu_pc"}>
          <NavMenu menuItems={menuItems} />
          {accessToken ? (
            <li className="cursor-pointer" onClick={() => handleLogout()}>
              Logout
            </li>
          ) : (
            <li className="cursor-pointer" onClick={() => navigate("/login")}>
              Login
            </li>
          )}
        </ul>

        {/* hamburger */}
        <div onClick={() => setShowMobMenu(!showMobMenu)} className="navbar_hamburger">
          {!showMobMenu ? <MenuIcon className="cursor-pointer" /> : <CloseIcon className="cursor-pointer" />}
        </div>

        {/* switch mode */}
        <SwitchMode />
      </div>
    </div>
  );
};

export default authConnector(Navbar);
