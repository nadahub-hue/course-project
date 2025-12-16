import { useState } from "react";
import { Container } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { driverLoginThunk } from "../slices/driverSlice";
 
export default function DriverLogin() {
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPassword, setDriverPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginMsg("");
 
    // 👇 send the same field names your backend expects
    dispatch(
      driverLoginThunk({
        driverEmail,
        driverPassword,
      })
    ).then((res) => {
      const payload = res?.payload;
 
      // success (backend should send: { loginStatus: true, driver, serverMsg })
      if (payload && payload.loginStatus) {
        navigate("/home"); // or /driver-dashboard
      } else {
        // wrong info or other error
        if (payload?.serverMsg) {
          setLoginMsg(payload.serverMsg);
        } else {
          setLoginMsg("Wrong email or password, please try again.");
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
          Driver Login
</h1>
 
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
 
        {/* Login button */}
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
          Login
</button>
 
        {/* wrong info / error message */}
        {loginMsg && (
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
            {loginMsg}
</div>
        )}
 
        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          Don&apos;t have a driver account?{" "}
<Link
            to="/driver-register"
            style={{ color: "#b42232", fontWeight: "bold" }}
>
            SIGN UP
</Link>
</p>
 
      </form>
 
      {/* Same style as DriverRegister */}
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