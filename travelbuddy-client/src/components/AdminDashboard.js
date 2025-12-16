import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../slices/adminSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.admin.admin);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/admin-login");
    }
  }, [isAdminLoggedIn, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin-login");
  };

  if (!isAdminLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="p-4">
      {/* PAGE TITLE */}
      <Row className="mb-4">
        <Col className="text-center">
          <h1 style={{ color: "#4b0082", fontWeight: "bold" }}>
            Admin Dashboard
          </h1>
        </Col>
      </Row>

      {/* CENTER WELCOME TEXT */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "800",
              color: "#b01982ff",
              marginTop: "40px",
            }}
          >
            Welcome!
          </h1>
        </Col>
      </Row>

      {/* LOGOUT BUTTON */}
      <Row>
        <Col className="text-center">
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#6910bc",
              color: "#ffffff",
              border: "none",
              borderRadius: "30px",
              padding: "12px 40px",
              fontSize: "1.3rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
          <br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </Col>
      </Row>
    </Container>
  );
}
