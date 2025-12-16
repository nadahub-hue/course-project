import { useState } from "react";
import { Container } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newDriverThunk } from "../slices/driverSlice";
 
export default function DriverRegister() {
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPassword, setDriverPassword] = useState("");
  const [cnfPwd, setCnfPwd] = useState("");
 
  // local message for errors / “already exist”
  const [serverMsg, setServerMsg] = useState("");
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setServerMsg(""); // clear old msg
 
    if (driverPassword !== cnfPwd) {
      setServerMsg("Passwords do not match ❌");
      return;
    }
 
    dispatch(
      newDriverThunk({
        driverName,
        driverPhone,
        driverEmail,
        driverPassword, // 👈 same field names used in backend /driverRegister
      })
    ).then((res) => {
      const payload = res?.payload;
 
      if (payload && payload.flag) {
        // successfully registered
        navigate("/driver-login");
      } else {
        // backend failed (e.g., driver already exists)
        if (payload?.serverMsg) {
          setServerMsg(payload.serverMsg);
        } else {
          setServerMsg("Driver registration failed");
        }
      }
    });
  };
 
  return (
<Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
>
<form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "650px",
          textAlign: "center",
        }}
>
<h1 style={{ color: "#b42232", marginBottom: "30px" }}>
         Driver register
</h1>
 
        {/* Name */}
<div className="inputBox">
<span className="icon">👤</span>
<input
            type="text"
            placeholder="Name"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            required
          />
</div>
 
        {/* Email */}
<div className="inputBox">
<span className="icon">📧</span>
<input
            type="email"
            placeholder="Email Address"
            value={driverEmail}
            onChange={(e) => setDriverEmail(e.target.value)}
            required
          />
</div>
 
        {/* Phone */}
<div className="inputBox">
<span className="icon">📞</span>
<input
            type="text"
            placeholder="Phone Number"
            value={driverPhone}
            onChange={(e) => setDriverPhone(e.target.value)}
            required
          />
</div>
 
        {/* Password */}
<div className="inputBox">
<span className="icon">🔒</span>
<input
            type="password"
            placeholder="Password"
            value={driverPassword}
            onChange={(e) => setDriverPassword(e.target.value)}
            required
          />
</div>
 
        {/* Confirm Password */}
<div className="inputBox">
<span className="icon">✔️</span>
<input
            type="password"
            placeholder="Confirm Password"
            value={cnfPwd}
            onChange={(e) => setCnfPwd(e.target.value)}
            required
          />
</div>
 
        {/* Submit Button */}
<button
          type="submit"
          style={{
            width: "80%",
            backgroundColor: "#8b2c2c",
            color: "white",
            borderRadius: "30px",
            padding: "12px",
            fontSize: "20px",
            marginTop: "20px",
            border: "none",
          }}
>
          Sign Up
</button>
 
        {/* Inline error / already exist message */}
        {serverMsg && (
<div
            style={{
              backgroundColor: "#ffe0e0",
              color: "#7b1515",
              padding: "10px",
              marginTop: "15px",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
>
            {serverMsg}
</div>
        )}
 
        <br />
<br />
<br />
 
        <p style={{ marginTop: "15px", fontSize: "18px" }}>
          Already have an account?{" "}
<Link
            to="/driver-login"
            style={{ color: "#b42232", fontWeight: "bold" }}
>
            LOGIN
</Link>
</p>
</form>
 
      {/* Styles for the input boxes */}
<style>{`
        .inputBox {
          width: 100%;
          max-width: 550px;
          background-color: #ffb4b4;
          padding: 14px 18px;
          margin: 12px auto;
          border-radius: 25px;
          display: flex;
          align-items: center;
        }
 
        .inputBox .icon {
          font-size: 20px;
          margin-right: 10px;
        }
 
        .inputBox input {
          width: 100%;
          border: none;
          background: transparent;
          font-size: 18px;
          outline: none;
        }
      `}</style>
</Container>
  );
}