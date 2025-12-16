import { Container, Row, Col, Button } from "reactstrap"
import { useNavigate } from "react-router-dom"
import commuImage from "../images/communication.png"

export default function AboutUs() {
  const navigate = useNavigate()

  return (
    <Container
      fluid
      className="p-0"
      style={{
        minHeight: "100vh",
      }}
    >

      {/* ❌ NO LOGO, NO HOME, NO SEARCH — EMPTY TOP AREA */}
      <div style={{ height: "30px" }}></div>

      {/* MAIN CONTENT */}
      <Container fluid style={{ padding: "0px 60px 50px 60px" }}>
        <Row style={{ alignItems: "flex-start" }}>

          {/* LEFT SIDE CONTENT */}
          <Col md="6" xs="12">
            <h1
              style={{
                fontSize: "4rem",
                fontWeight: "700",
                color: "#6E2F8A",
                marginBottom: "25px"
              }}
            >
              About Us
            </h1>

            <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
              Travel Buddy was created to assist people in finding compatible
              travel companions based on their gender, present location, and
              preferred destination.
            </p>

            <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
              Our live chat function allows consumers to interact instantly and
              easily organize their trips. For equitable and transparent cost sharing,
              we provide an all-in-one taxi booking service with automatic fare calculation.
            </p>

            <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
              Travel Buddy contributes to lower air pollution and traffic congestion
              by encouraging ride-sharing as a safer, more economical, and environmentally
              friendly way to travel.
            </p>

            <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
              Based in Oman, our platform builds a trusted community that makes travel
              easier, safer, and more sustainable—addressing local concerns about safety
              and high transportation costs.
            </p>


            <Button
              onClick={() => navigate("/home")}
              style={{
                backgroundColor: "#9854c6",
                color: "#ffffff"
              }}
            >
              Back
            </Button>
          </Col>

          {/* RIGHT SIDE IMAGE */}
          <Col
            md="6"
            xs="12"
            className="d-flex justify-content-center align-items-start"
          >
            <img
              src={commuImage}
              alt="About illustration"
              style={{
                width: "520px",
                maxWidth: "100%",
                marginTop: "10px"
              }}
            />
          </Col>
        </Row>
      </Container>

    </Container>
  )
}
