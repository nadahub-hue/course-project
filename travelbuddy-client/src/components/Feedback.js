import { Container, Row, Col, FormGroup } from "reactstrap"
import { useState } from "react"

export default function Feedback() {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [serverMsg, setServerMsg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:7500/sendFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: "demo@user.com",
          rating,
          comment
        })
      })
      const data = await res.json()
      setServerMsg(data.serverMsg || "Thank you for your feedback!")
    } catch (err) {
      console.log(err)
      setServerMsg("Something went wrong")
    }
  }

  return (
    <Container
      fluid
      className="p-0 d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
      }}
    >
      <Container style={{ maxWidth: "800px" }}>
        <Row>
          <Col className="text-center">
            {/* Title */}
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: 700,
                color: "#6E2F8A",
                marginBottom: "25px"
              }}
            >
              Give feedback
            </h1>

            {/* Question 1 */}
            <p
              style={{
                fontSize: "1.6rem",
                fontWeight: 600,
                marginBottom: "10px"
              }}
            >
              How would you rate your overall experience?
            </p>

            {/* Stars */}
            <FormGroup style={{ marginBottom: "30px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    cursor: "pointer",
                    fontSize: "3rem",
                    margin: "0 6px",
                    color: rating >= star ? "#ffb400" : "#e0e0e0", // yellow vs light grey
                    transition: "transform 0.15s"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                >
                  ★
                </span>
              ))}
            </FormGroup>

            {/* Question 2 */}
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 500,
                marginBottom: "15px"
              }}
            >
              Kindly take a moment to tell us what you think
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Text area */}
              <FormGroup>
                <textarea
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    margin: "0 auto",
                    display: "block",
                    borderRadius: "18px",
                    border: "none",
                    padding: "15px 18px",
                    fontSize: "1rem",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.12)",
                    resize: "none",
                    backgroundColor:'#ead1e8ff'
                    
                  }}
                />
              </FormGroup>

              {/* Button */}
              <button
                type="submit"
                style={{
                  backgroundColor: "#4b2c91",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "40px",
                  padding: "12px 40px",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  marginTop: "25px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                }}
              >
                Share My Feedback
              </button>
            </form>

            {/* Server message */}
            {serverMsg && (
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "0.95rem",
                  color: "#333"
                }}
              >
                {serverMsg}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
