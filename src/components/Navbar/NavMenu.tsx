import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavMenu.scss";

type Props = {
  menuItems: {
    name: string;
    href: string;
  }[];
};

const NavMenu = ({ menuItems }: Props) => {
  const slug = useLocation();
  return (
    <li className="nav-menu  flex">
      <ul>
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              role="navigation"
              className={`navbar_menu_item cursor-pointer ${
                slug.pathname === item.href && "navbar_menu_item-active"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default NavMenu;
