import { Container, Row, Col, Button } from "reactstrap"
import { useNavigate } from "react-router-dom"
import welcomeImg from "../images/welcome photo.png"

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <Container
      fluid
      className="p-0 "
      style={{ minHeight: "100vh "}}
      
    >
      <Row
        className="m-0 d-flex flex-column justify-content-between   "
        style={{ minHeight: "100vh" }}
      >
        {/* top part: title + image */}
        <Col className="d-flex align-items-center justify-content-center">
          <Row
            className="w-100 m-0 align-items-center justify-content-center"
            style={{ maxWidth: "900px" }}
          >
            {/* LEFT SIDE: Travel + Buddy */}
            <Col md="6" className="text-center text-md-start">
              <h1
                style={{
                  color: "#7b238e",
                  fontWeight: 700,
                  fontSize: "3rem"
                }}
              >
                Travel
              </h1>

              <h1
                style={{
                  color: "#800d0dff",
                  fontWeight: 700,
                  fontSize: "3rem",
                  marginTop: "-10px",
                  marginLeft: "30px"
                }}
              >
                Buddy
              </h1>
            </Col>

            {/* RIGHT SIDE: image */}
            <Col
              md="6"
              className="text-center mt-4 mt-md-0 d-flex flex-column align-items-center"
            >
              <img
                src={welcomeImg}
                alt="Travel Buddy"
                style={{ maxWidth: "320px", width: "100%" }}
              />
            </Col>
          </Row>
        </Col>

        {/* Center Welcome text ABOVE button */}
        <Col className="text-center mt-3">
          <p
            style={{
              color: "#800d0dff",
              fontSize: "50px",
              fontWeight: "bold",
              marginBottom: "10px"
            }}
          >
            Welcome !
          </p>
        </Col>

        {/* bottom purple bar button */}
        <Col xs="12" className="p-0">
         {/* Bottom Purple Full-Width Button */}
<div
  style={{
    width: "100vw",       // full viewport width
    margin: 0,
    padding: 0,
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw",  // remove container margins
    marginRight: "-50vw"
  }}
>
  <Button
    className="border-0 rounded-0"
    style={{
      width: "100%",
      backgroundColor: "#3e005a",
      color: "#ffffff",
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "0.15em",
      padding: "50px 0",
      margin: 0
    }}
    onClick={() => navigate("/user-type")}
  >
    Get&nbsp;Started
  </Button>
</div>

        </Col>
      </Row>
    </Container>
  )
}
