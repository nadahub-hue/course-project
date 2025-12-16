import { Container, FormGroup, Label } from "reactstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("info");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMsg("Invalid reset link");
      setType("error");
      return;
    }

    try {
      const res = await fetch("http://localhost:7500/reset-password-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      setMsg(data.msg);
      setType(data.flag ? "success" : "error");

      if (data.flag) {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error(err);
      setMsg("Server error, try again later");
      setType("error");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Container style={{ maxWidth: 500 }}>
        <h2 className="text-center mb-4" style={{ color: "#4b0082" }}>
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label style={{ fontWeight: 600 }}>New Password</Label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
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
            Reset Password
          </button>
        </form>

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
