// src/components/AdminLogin.js
import { Container, Row, Col, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginThunk } from "../slices/adminSlice"; // <- create this thunk in your adminSlice

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminMsg = useSelector((state) => state.admin.msg);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const loading = useSelector((state) => state.admin.loading);

  useEffect(() => {
    if (isAdminLoggedIn) {
      // redirect admin after login
      navigate("/home");
    }
  }, [isAdminLoggedIn, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(adminLoginThunk({ adminEmail: email, adminPassword: pwd }));
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center"
    >
      <Container
        style={{
          maxWidth: "480px",
          paddingTop: "40px",
          paddingBottom: "30px",
        }}
      >
        {/* title */}
        <Row className="mb-4">
          <Col className="text-center">
            <h1
              style={{
                color: "#4b0082",
                fontWeight: "bold",
                fontSize: "2.5rem",
              }}
            >
              Admin Login
            </h1>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col className="d-flex justify-content-center">
            <div
              style={{
                display: "inline-flex",
                borderRadius: "40px",
                overflow: "hidden",
              }}
            >
              
            </div>
          </Col>
        </Row>

        {/* form */}
        <form onSubmit={handleLogin}>
          {/* email */}
          <FormGroup className="mb-3">
            <div
              style={{
                backgroundColor: "#9cb4e2",
                borderRadius: "20px",
                padding: "10px 16px",
              }}
            >
              <div className="d-flex align-items-center">
                <span style={{ marginRight: "10px" }}>👤</span>
                <input
                  type="email"
                  className="form-control border-0"
                  style={{ backgroundColor: "transparent", boxShadow: "none" }}
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </FormGroup>

          {/* password */}
          <FormGroup className="mb-3">
            <div
              style={{
                backgroundColor: "#9cb4e2",
                borderRadius: "20px",
                padding: "10px 16px",
              }}
            >
              <div className="d-flex align-items-center">
                <span style={{ marginRight: "10px" }}>🔒</span>
                <input
                  type="password"
                  className="form-control border-0"
                  style={{ backgroundColor: "transparent", boxShadow: "none" }}
                  placeholder="Admin Password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                />
              </div>
            </div>
          </FormGroup>

          {/* login button */}
          <Row className="mb-3">
            <Col className="text-center">
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: loading ? "#cccccc" : "#3e2aa8",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "30px",
                  padding: "10px 70px",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <br />   <br />   <br />   <br />   <br />  <br />   <br />   <br />  <br />  <br />  <br />  <br />
            </Col>
          </Row>

          {/* server message */}
          {adminMsg && <div className="alert alert-info mt-3">{adminMsg}</div>}
        </form>
      </Container>
    </Container>
  );
}
