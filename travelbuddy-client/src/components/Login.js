import { Container, Row, Col, FormGroup } from "reactstrap"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginThunk } from "../slices/userSlice"


export default function Login() {
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userMsg = useSelector((state) => state.user.msg)
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/search")
    }
  }, [isLoggedIn, navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginThunk({ email, pwd }))
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center"
    >
      <Container
        style={{
          maxWidth: "480px",
          paddingTop: "40px",
          paddingBottom: "30px"
        }}
      >
        {/* title */}
        <Row className="mb-4">
          <Col className="text-center">
            <h1
              style={{
                color: "#4b0082",
                fontWeight: "bold",
                fontSize: "2.5rem"
              }}
            >
              Customer Login
            </h1>
          </Col>
        </Row>

        {/* toggle buttons: Login (active) / Sign up */}
        <Row className="mb-4">
          <Col className="d-flex justify-content-center">
            <div
              style={{
                display: "inline-flex",
                borderRadius: "40px",
                overflow: "hidden"
              }}
            >
              {/* Login tab - active */}
              <button
                type="button"
                style={{
                  border: "none",
                  padding: "10px 30px",
                  backgroundColor: "#3e005a",
                  color: "#ffffff",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "default"
                }}
              >
                Login
              </button>

              {/* Sign up tab */}
              <button
                type="button"
                onClick={() => navigate("/register")}
                style={{
                  border: "none",
                  padding: "10px 30px",
                  backgroundColor: "#c0b4ff",
                  color: "#ffffff",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Sign up
              </button>
            </div>
          </Col>
        </Row>

        {/* form */}
        <form onSubmit={handleLogin}>
          {/* username/email */}
          <FormGroup className="mb-3">
            <div
              style={{
                backgroundColor: "#9cb4e2",
                borderRadius: "20px",
                padding: "10px 16px"
              }}
            >
              <div className="d-flex align-items-center">
                <span style={{ marginRight: "10px" }}>👤</span>
                <input
                  type="email"
                  className="form-control border-0"
                  style={{ backgroundColor: "transparent", boxShadow: "none" }}
                  placeholder="Type Your Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </FormGroup>

          {/* password */}
          <FormGroup className="mb-2">
            <div
              style={{
                backgroundColor: "#9cb4e2",
                borderRadius: "20px",
                padding: "10px 16px"
              }}
            >
              <div className="d-flex align-items-center">
                <span style={{ marginRight: "10px" }}>🔒</span>
                <input
                  type="password"
                  className="form-control border-0"
                  style={{ backgroundColor: "transparent", boxShadow: "none" }}
                  placeholder="Type Your Password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </div>
            </div>
          </FormGroup>

          {/* forgot password */}
          <Row className="mb-3">
            <Col className="text-start">
              <Link
                to="/forgotPassword"
                style={{
                  color: "#0b5c63",
                  fontWeight: "bold",
                  textDecoration: "none"
                }}
              >
                Forgot Password?
              </Link>
            </Col>
          </Row>

          {/* login button */}
          <Row className="mb-3">
            <Col className="text-center">
              <button
                type="submit"
                style={{
                  backgroundColor: "#4b0082",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "30px",
                  padding: "10px 70px",
                  fontSize: "1.3rem",
                  fontWeight: "bold"
                }}
              >
                Login
              </button>
                <br />  <br />  <br />  <br />  <br />  <br />  <br />
            </Col>
          </Row>

          {/* create account */}
          <Row>
            <Col className="text-center">
              <span style={{ color: "#155b6a", fontSize: "1rem" }}>
                Create an account?{" "}
              </span>
              <Link
                to="/register"
                style={{
                  color: "red",
                  fontWeight: "bold",
                  textDecoration: "none"
                }}
              >
                Sign Up Now
              </Link>
            </Col>
          </Row>

          {userMsg && <div className="alert alert-info mt-3">{userMsg}</div>}
        </form>
      </Container>
    </Container>
  )
}
  

