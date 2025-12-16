import { Container, Row, Col, Button } from "reactstrap";
import { useState } from "react";

// change the paths / names to match your project
import boyIcon from "../images/avatar-design.png";
import girlIcon from "../images/female (1).png";
import sendIcon from "../images/fast-forward.png";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [nextSender, setNextSender] = useState("girl");

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: text.trim(),
      sender: nextSender
    };

    setMessages((old) => [...old, newMsg]);
    setText("");
    setNextSender((s) => (s === "girl" ? "boy" : "girl"));
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center"
      style={{  minHeight: "100vh", paddingTop: 40 }}
    >
      <Col md="8" lg="6">
        {/* TOP TWO PEOPLE */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            marginBottom: 20
          }}
        >
          <img src={boyIcon} alt="boy" style={{ height: 70 }} />
          <img src={girlIcon} alt="girl" style={{ height: 70 }} />
        </div>

        {/* THIN LINE */}
        <div
          style={{
            borderTop: "1px solid #444",
            marginBottom: 40
          }}
        />

        {/* CHAT BUBBLES */}
        <div style={{ minHeight: 220, marginBottom: 40 }}>
          {messages.map((m) => {
            const isGirl = m.sender === "girl";
            return (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent: isGirl ? "flex-start" : "flex-end",
                  marginBottom: 20
                }}
              >
                {isGirl && (
                  <img
                    src={girlIcon}
                    alt="girl"
                    style={{ height: 60, marginRight: 15 }}
                  />
                )}

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 30,
                    padding: "18px 26px",
                    maxWidth: "60%",
                    fontSize: "1rem"
                  }}
                >
                  {m.text}
                </div>

                {!isGirl && (
                  <img
                    src={boyIcon}
                    alt="boy"
                    style={{ height: 60, marginLeft: 15 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* INPUT AREA LIKE IN THE DESIGN */}
        <form onSubmit={handleSend}>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 30,
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                width: "70%",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write Message"
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: "1.05rem",
                  backgroundColor: "transparent"
                }}
              />
              <Button
                type="submit"
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  padding: 0
                }}
              >
                <img src={sendIcon} alt="send" style={{ height: 28 }} />
              </Button>
            </div>
          </div>
        </form>
      </Col>
    </Container>
  );
}
