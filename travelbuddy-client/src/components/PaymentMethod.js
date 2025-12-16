// PaymentMethods.js
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";

// IMAGES
import moneyIcon from "../images/money.png";  // hand with money
import cardIcon from "../images/visa.png";    // card icon

export default function PaymentMethods() {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-start align-items-center"
      style={{
        minHeight: "100vh",
        paddingTop: "40px",
        textAlign: "center",
      }}
    >
      {/* Top Icon */}
      <img
        src={moneyIcon}
        alt="Payment Icon"
        style={{ height: "120px", marginBottom: "10px" }}
      />

      {/* Page Title */}
      <h2
        style={{
          marginTop: "10px",
          fontSize: "2rem",
          color: "#3b2643",
          fontWeight: "600",
        }}
      >
        Continue For Payment
      </h2>

      {/* Card Payment Option */}
      <div
        onClick={() => navigate("/card-payment")}
        style={{
          marginTop: "80px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          cursor: "pointer",
        }}
      >
        <img src={cardIcon} alt="Card Icon" style={{ height: "80px" }} />

        <h3
          style={{
            fontSize: "2.3rem",
            color: "#3b2643",
            fontWeight: "600",
          }}
        >
          Card
        </h3>
      </div>
    </Container>
  );
}
