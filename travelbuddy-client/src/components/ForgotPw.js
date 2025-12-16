import { Container, FormGroup, Label } from "reactstrap";
import { useState } from "react";

export default function ForgotPw() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("info");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:7500/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMsg(data.msg || "Something happened");
      setType(data.flag ? "success" : "error");
    } catch (err) {
      console.log(err);
      setMsg("Server error, try again later.");
      setType("error");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center"
    >
      <Container style={{ maxWidth: "500px", marginTop: "40px" }}>
        <h2 style={{ textAlign: "center", color: "#4b0082", marginBottom: 20 }}>
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label style={{ fontWeight: 600 }}>Email address</Label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <button
            type="submit"
            style={{
              marginTop: 10,
              width: "100%",
              backgroundColor: "#4b1a9a",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "10px",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Send Reset Link
          </button>
        </form>

        <br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        {msg && (
          <div
            className={`mt-3 alert ${
              type === "success"
                ? "alert-success"
                : type === "error"
                ? "alert-danger"
                : "alert-info"
            }`}
          >
            {msg}
          </div>
        )}
      </Container>
    </Container>
  );
}
