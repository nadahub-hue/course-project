import { Navbar, Nav, NavItem } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

// logout actions
import { logout as userLogout } from "../slices/userSlice";
import { logout as driverLogout } from "../slices/driverSlice";
import { logout as adminLogout } from "../slices/adminSlice";

import logoImg from "../images/logo2.png";
import homePic from "../images/house.png";
import searchIcon from "../images/search.png";
import aboutIcon from "../images/team.png";
import chatIcon from "../images/chat.png";
import paymentIcon from "../images/card.png";
import bookingIcon from "../images/booking.png";
import ConformBooking from "../images/conformbook.png";
import feedbackIcon from "../images/good-feedback.png";
import profileIcon from "../images/user (1).png";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // ✅ Dark mode state
  const [theme, setTheme] = useState("light");

  // ✅ load saved theme once
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  // ✅ toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(driverLogout());
    dispatch(adminLogout());

    localStorage.removeItem("userToken");
    localStorage.removeItem("driverToken");
    localStorage.removeItem("adminToken");

    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      className="px-4 shadow-sm"
      style={{ backgroundColor: "#c7b6ee", height: "80px" }}
    >
      {/* Logo */}
      <Link to="/" className="d-flex align-items-center">
        <img
          src={logoImg}
          alt="Travel Buddy Logo"
          style={{ height: "60px", width: "60px", cursor: "pointer" }}
        />
      </Link>

      {/* Menu */}
      <Nav
        navbar
        className="mx-auto d-flex align-items-center"
        style={{ gap: "35px", fontSize: "1.1rem", fontWeight: 500 }}
      >
        <NavItem>
          <Link
            to="/home"
            className="nav-link d-flex align-items-center"
            style={{ color: "#4b0082", gap: "6px" }}
          >
            <img src={homePic} alt="Home" style={{ height: "26px" }} />
            Home
          </Link>
        </NavItem>

        <NavItem>
          <Link
            to="/about"
            className="nav-link d-flex align-items-center"
            style={{ color: "#4b0082", gap: "6px" }}
          >
            <img src={aboutIcon} alt="About" style={{ height: "26px" }} />
            About Us
          </Link>
        </NavItem>

        <NavItem>
          <Link
            to="/search"
            className="nav-link d-flex align-items-center"
            style={{ color: "#4b0082", gap: "6px" }}
          >
            <img src={searchIcon} alt="Search" style={{ height: "26px" }} />
            Search
          </Link>
        </NavItem>

        <NavItem>
          <Link
            to="/booking"
            className="nav-link d-flex align-items-center"
            style={{ color: "#4b0082", gap: "6px" }}
          >
            <img src={bookingIcon} alt="Booking" style={{ height: "26px" }} />
            Booking
          </Link>
        </NavItem>

        <NavItem>
          <Link
            to="/conform-booking"
            className="nav-link d-flex align-items-center"
            style={{ color: "#4b0082", gap: "6px" }}
          >
            <img src={ConformBooking} alt="Confirm" style={{ height: "26px" }} />
            Confirm Booking
          </Link>
        </NavItem>

        <NavItem>
          <Link
            to="/payment-method"
            className="nav-link d-flex align-items-center"
            style={{ color: "#4b0082", gap: "6px" }}
          >
            <img src={paymentIcon} alt="Payment" style={{ height: "26px" }} />
            Payment
          </Link>
        </NavItem>

        <NavItem>
          <Link
            to="/chat"
            className="nav-link d-flex align-items-center"
            style={{ color: "#4b0082", gap: "6px" }}
          >
            <img src={chatIcon} alt="Chat" style={{ height: "26px" }} />
            Chat
          </Link>
        </NavItem>

        <NavItem>
          <Link
            to="/feedback"
            className="nav-link d-flex align-items-center"
            style={{ color: "#4b0082", gap: "6px" }}
          >
            <img src={feedbackIcon} alt="Feedback" style={{ height: "26px" }} />
            Feedback
          </Link>
        </NavItem>

        {/* USER PROFILE */}
        <NavItem>
          <div ref={profileRef} style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
              onClick={() => setIsProfileOpen((o) => !o)}
            >
              <img src={profileIcon} alt="User" style={{ width: "45px" }} />
              <span style={{ fontSize: "1.6rem" }}>
                {isProfileOpen ? "˄" : "˅"}
              </span>
            </div>

            {isProfileOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "60px",
                  right: 0,
                  width: "220px",
                  backgroundColor: "#e9d1ef",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  padding: "10px 0",
                }}
              >
                {/* ✅ Dark Mode row */}
                <div
                  style={{
                    padding: "12px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#222",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                  onClick={toggleTheme}
                >
                  <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                  <span>{theme === "light" ? "🌙" : "☀"}</span>
                </div>

                {/* divider */}
                <div style={{ height: "1px", backgroundColor: "#d6b8dd" }} />

                {/* Logout row */}
                <div
                  style={{
                    padding: "12px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#8b1313",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                  <span>›</span>
                </div>
              </div>
            )}
          </div>
        </NavItem>
      </Nav>
    </Navbar>
  );
}
