import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import Navbarlogo from "../../assets/navbarlogo.jpg";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../redux/auth/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const menus = [
  "Dashboard",
  "Chat",
  "Machines",
  "Transactions",
  "Products",
  "Payments",
  "Reports",
  "Customers",
  "Users",
  "Roles",
  "Settings",
  "Inventory",
  "Orders",
  "Invoices",
  "Support",
  "Audit Logs",
  "Analytics",
  "Notifications",
  "Subscriptions",
  "Billing",
  "Integrations",
  "Security",
  "Teams",
  "Locations",
  "Vendors",
  "Profile",
];

const Navbar = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const menuContainerRef = useRef(null);
  const accountDetails = JSON.parse(localStorage.getItem("accountDetails"));
  console.log("acoutn", accountDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const scrollLeft = () => {
    menuContainerRef.current?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    menuContainerRef.current?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const checkScrollPosition = () => {
    const container = menuContainerRef.current;

    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);

    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1,
    );
  };

  useEffect(() => {
    checkScrollPosition();
  }, []);
  return (
    <div>
      <div className="login-screen-upper-bar">
        <div className="navbar-left">
          <img src={Navbarlogo} alt="Logo" className="navbar-logo" />

          <div className="logo-text">
            <span>Horse</span>
            <span>Power</span>
          </div>
        </div>

        <div className="navbar-center">
          <input type="text" placeholder="Search" className="search-input" />
        </div>

        <div className="navbar-right">
          <div className="user-menu">
            <div className="user-info">
              <FaUserCircle />
              <div className="user-details-flex">
                <span>{accountDetails?.companyName}</span>
                <span>{accountDetails?.accountType}</span>
              </div>
            </div>

            <div className="dropdown-menu">
              <div className="dropdown-item">My Profile</div>
              <div className="dropdown-item">Update account</div>

              <div className="dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-screen-lower-bar">
        <button
          className="scroll-btn"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          ◀
        </button>

        <div
          className="menu-container"
          ref={menuContainerRef}
          onScroll={checkScrollPosition}
        >
          {menus.map((menu) => (
            <NavLink
              key={menu}
              to={`/${menu.toLowerCase().replaceAll(" ", "-")}`}
              className={({ isActive }) =>
                isActive ? "menu-link active-link" : "menu-link"
              }
            >
              {menu}
            </NavLink>
          ))}
        </div>

        <button
          className="scroll-btn"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Navbar;
