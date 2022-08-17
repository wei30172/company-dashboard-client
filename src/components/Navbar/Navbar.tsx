import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../contexts/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { useUserLogoutMutation } from "../../services/authApiSlice";
import { selectCurrentToken, selectCurrentUser } from "../../features/auth/authSlice";

import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import { SwitchMode, NavMenu } from "../index";
import logo from "../../assets/logo.svg";
import "./Navbar.scss";
import { toast } from "react-hot-toast";

const Navbar = () => {
  // const { auth, userLogout } = useAuthContext();
  const [userLogout] = useUserLogoutMutation();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const navigate = useNavigate();
  const [showMobMenu, setShowMobMenu] = useState(false);

  const menuItems = [
    {
      name: "Home",
      href: "/home",
    },
    {
      name: "Lounge",
      href: "/lounge",
    },
    {
      name: "Editor",
      href: "/editor",
    },
    {
      name: "Admin",
      href: "/admin",
    },
    {
      name: "Users",
      href: "/users",
    },
  ];

  const handleLogout = async () => {
    // userLogout();
    try {
      await userLogout().unwrap();
      dispatch(logOut());
      toast.success("Logout Successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout Failure.");
    }
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
          {token ? <li className="flex">{`[${user.role}]-${user.name}-${tokenAbbr}`}</li> : <li className="flex">Welcome, User.</li>}
          <NavMenu menuItems={menuItems} />
          {token ? (
            <li className="cursor-pointer flex" onClick={handleLogout}>
              Logout
            </li>
          ) : (
            <li className="cursor-pointer flex" onClick={() => navigate("/login")}>
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

export default Navbar;
