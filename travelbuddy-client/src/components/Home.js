import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// TOP BAR IMAGES
import logoImg from "../images/logo2.png";
import protestIcon from "../images/protest.png";
import searchIcon from "../images/search.png";
import profileIcon from "../images/user (1).png";
import aboutIcon from "../images/team.png";
import homePic from "../images/taxi-call.jpg";

// FEATURE ICONS
import moneyIcon from "../images/lowest-price.png";
import trustIcon from "../images/trust.png";

export default function Home() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // simple logout handler (front-end only)
  const handleLogout = () => {
    // if you store tokens in localStorage, clear them here
    // localStorage.removeItem("userToken");
    // localStorage.removeItem("driverToken");
    // localStorage.removeItem("adminToken");

    setIsMenuOpen(false);
    navigate("/"); // go to welcome / home after logout
  };

  return (
    <Container fluid className="p-0">
      {/* TOP PURPLE BAR */}
      <div
        style={{
          backgroundColor: "#8c5adf",
          padding: "10px 35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT — LOGO (CLICK TO GO TO WELCOME PAGE) */}
        <img
          src={logoImg}
          alt="Travel Buddy Logo"
          style={{
            height: "85px",
            width: "85px",
            objectFit: "contain",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        />

        {/* MIDDLE — ABOUT + SEARCH */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "80px",
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {/* ABOUT US */}
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/about")}
          >
            <img
              src={aboutIcon}
              alt="About Us"
              style={{ width: "40px", marginRight: "10px" }}
            />
            About Us
          </div>

          {/* SEARCH */}
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/search")}
          >
            <img
              src={searchIcon}
              alt="Search"
              style={{ width: "38px", marginRight: "10px" }}
            />
            Search
          </div>
        </div>

        {/* RIGHT — PROFILE WITH DROPDOWN (ONLY LOGOUT) */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <div
            style={{
              borderRadius: "50%",
              padding: "8px",
            }}
          >
            <img src={profileIcon} alt="User" style={{ width: "45px" }} />
          </div>
          <span style={{ fontSize: "1.8rem", color: "black" }}>
            {isMenuOpen ? "˄" : "˅"}
          </span>

          {isMenuOpen && (
            <div
              style={{
                position: "absolute",
                top: "80px",
                right: 0,
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                borderRadius: "6px",
                minWidth: "260px",
                padding: "12px 0",
                zIndex: 10,
                backgroundColor: "#e9d1efff",
              }}
            >
              {/* Logout row ONLY */}
              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#8b1313ff",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                <span>Logout</span>
                <span style={{ fontSize: "1.4rem" }}>›</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* HERO IMAGE */}
      <img
        src={homePic}
        alt="Hero"
        style={{ width: "100%", maxHeight: "260px", objectFit: "cover" }}
      />

      {/* FEATURE SECTION */}
      <Container style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <Row
          className="text-center"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          <Col md="4" className="mb-4">
            <img src={moneyIcon} style={{ width: "70px" }} alt="Low price" />
            <h5 style={{ fontWeight: "bold", marginTop: "10px" }}>
              Your pick of rides at low prices
            </h5>
            <p style={{ textAlign: "left" }}>
              Find the ideal ride from our extensive list of locations and
              routes at affordable pricing, whether you're traveling by bus or
              carpooling.
            </p>
          </Col>

          <Col md="4" className="mb-4">
            <img src={trustIcon} style={{ width: "70px" }} alt="Trust" />
            <h5 style={{ fontWeight: "bold", marginTop: "10px" }}>
              Have faith in the people you travel with.
            </h5>
            <p style={{ textAlign: "left" }}>
              We spend time getting to know each of our bus partners and
              members. We verify IDs, reviews, and profiles so you can book your
              trip on our safe platform with confidence and know who you're
              traveling with.
            </p>
          </Col>

          <Col md="4" className="mb-4">
            <img src={protestIcon} style={{ width: "70px" }} alt="Easy" />
            <h5 style={{ fontWeight: "bold", marginTop: "10px" }}>
              Scroll, click, tap and go!
            </h5>
            <p style={{ textAlign: "left" }}>
              It's never been so simple to book a ride! Thanks to our easy
              software driven by outstanding technology, you may schedule a ride
              close to you in only minutes.
            </p>
            <br /> <br /><br />

            <Button
            onClick={() => navigate("/search")}
            style={{
              backgroundColor: "#9854c6",
              color: "#ffffff",
              marginTop: "15px",
            }}
          >
            Back
          </Button>

          
            <br />
            <br />
            <br />

            
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
