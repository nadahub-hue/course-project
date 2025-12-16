import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setMsg("Saved Successfully ✓");

    setTimeout(() => {
      navigate("/conform-booking", {
        state: { startLocation, endLocation },
      });
    }, 1000);
  };

  return (
    <Container fluid className="py-4">
      <Container style={{ maxWidth: "900px" }}>
        {/* Page Title */}
        <Row className="mb-4">
          <Col className="text-center">
            <h2 style={{ color: "#4b0082", fontWeight: "700" }}>
              Book Your Ride
            </h2>

            <p style={{ color: "#555" }}>
              Enter your start and end locations and save them.
            </p>
          </Col>
        </Row>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md="6">
              <FormGroup>
                <Label for="startLocation" style={{ fontWeight: "600" }}>
                  Start Location
                </Label>
                <Input
                  id="startLocation"
                  type="text"
                  placeholder="e.g. Muscat City Center"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup>
                <Label for="endLocation" style={{ fontWeight: "600" }}>
                  End Location
                </Label>
                <Input
                  id="endLocation"
                  type="text"
                  placeholder="e.g. Sultan Qaboos University"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>

          {/* Save Button */}
          <Row className="mb-3">
            <Col className="text-center">
              <Button
                type="submit"
                style={{
                  backgroundColor: "#4b0082",
                  borderColor: "#4b0082",
                  padding: "10px 40px",
                  fontWeight: "600",
                }}
              >
                Save Locations
              </Button>
            </Col>
          </Row>

          {/* Success Message */}
          {msg && (
            <Row>
              <Col className="text-center">
                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  {msg}
                </p>
              </Col>
            </Row>
          )}
        </form>

        {/* Map Box */}
        <Row>
          <Col>
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                marginTop: "20px",
              }}
            >
              <iframe
                title="Booking Map"
                width="100%"
                height="450"
                src="https://www.openstreetmap.org/export/embed.html?bbox=54.8%2C22.5%2C60.0%2C27.5&layer=mapnik"
              ></iframe>
            </div>
          </Col>

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
        </Row>
      </Container>
    </Container>
  );
}
