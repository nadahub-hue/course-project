import { Container, Button } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import maleIcon from "../images/male.png";
import femaleIcon from "../images/female.png";

export default function SearchTrips() {
  const navigate = useNavigate();

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("any");

  const handleSearch = (e) => {
    e.preventDefault();

    navigate("/booking", {
      state: {
        startLocation: fromLocation,
        endLocation: toLocation,
        date,
        gender,
      },
    });
  };

  return (
    <Container fluid className="p-0">
      {/* PAGE TITLE */}
      <h1
        style={{
          textAlign: "center",
          paddingTop: "40px",
          fontSize: "3rem",
          fontWeight: 700,
          color: "#3c175a",
        }}
      >
        Where do you want to go?
      </h1>

      {/* SEARCH BAR */}
      <form onSubmit={handleSearch}>
        <div
          style={{
            margin: "35px auto 0 auto",
            maxWidth: "1000px",
            display: "flex",
            alignItems: "stretch",
            borderRadius: "40px",
            overflow: "hidden",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          {/* LEFT INPUT SECTION */}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1.2fr 1.2fr 0.8fr 0.9fr",
              alignItems: "center",
              padding: "18px 30px",
              fontSize: "1.1rem",
            }}
          >
            {/* Leaving from */}
            <div style={{ borderRight: "1px solid #ddd", paddingRight: "15px" }}>
              <div style={{ fontWeight: 500, marginBottom: "3px" }}>
                Leaving from
              </div>
              <input
                type="text"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                required
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Going to */}
            <div
              style={{
                borderRight: "1px solid #ddd",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              <div style={{ fontWeight: 500, marginBottom: "3px" }}>
                Going To
              </div>
              <input
                type="text"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                required
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Date */}
            <div
              style={{
                borderRight: "1px solid #ddd",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              <div style={{ fontWeight: 500, marginBottom: "3px" }}>Today</div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "1rem",
                  backgroundColor: "transparent",
                }}
              />
            </div>

            {/* Gender */}
            <div style={{ display: "flex", flexDirection: "column", paddingLeft: "15px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "6px",
                  cursor: "pointer",
                }}
                onClick={() => setGender("male")}
              >
                <img src={maleIcon} alt="Male" style={{ width: "26px", marginRight: "6px" }} />
                <span
                  style={{
                    fontWeight: gender === "male" ? 700 : 500,
                    color: gender === "male" ? "#1b4f72" : "#000",
                  }}
                >
                  Male
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setGender("female")}
              >
                <img src={femaleIcon} alt="Female" style={{ width: "26px", marginRight: "6px" }} />
                <span
                  style={{
                    fontWeight: gender === "female" ? 700 : 500,
                    color: gender === "female" ? "#c2185b" : "#000",
                  }}
                >
                  Female
                </span>
              </div>
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <button
            type="submit"
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "#4b1a9a",
              color: "#ffffff",
              padding: "0 60px",
              fontSize: "2rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </form>

      {/* Spacing */}
      <div style={{ marginTop: "35px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#171129",
          }}
        >
          Find the perfect ride without breaking the bank
        </h2>
        <br></br>
        <Button
          onClick={() => navigate("/about")}
          style={{
            backgroundColor: "#9854c6",
            color: "#ffffff"
          }}
        >
          Back
        </Button>
        <br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>

    </Container>
  );
}
