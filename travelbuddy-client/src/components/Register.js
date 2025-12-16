import { useState } from "react";
import { Container, Row, Col, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import regFormValidationSchema from "../validations/registerValidation";
import { newUserThunk } from "../slices/userSlice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serverMsg, setServerMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(regFormValidationSchema)
  });

  const onSubmit = (formData) => {
    setServerMsg(""); 

    dispatch(newUserThunk(formData)).then((res) => {
      const payload = res?.payload;

      if (payload && payload.flag) {
        navigate("/login");
      } else {
   
        const msgFromBackend = payload?.msg;
        if (msgFromBackend) {
          setServerMsg(msgFromBackend);
        } else {
          setServerMsg("Account already exist");
        }
      }
    });
  };

  return (
    <Container fluid className="d-flex justify-content-center">
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
              Customer Register
            </h1>
          </Col>
        </Row>

        {/* toggle buttons */}
        <Row className="mb-4">
          <Col className="d-flex justify-content-center">
            <div
              style={{
                display: "inline-flex",
                borderRadius: "40px",
                overflow: "hidden"
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/login")}
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
                Login
              </button>

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
                Sign up
              </button>
            </div>
          </Col>
        </Row>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
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
                  className="form-control border-0"
                  style={{
                    backgroundColor: "transparent",
                    boxShadow: "none"
                  }}
                  placeholder="Name"
                  {...register("fullName")}
                />
              </div>
            </div>
            <small className="text-danger">{errors.fullName?.message}</small>
          </FormGroup>

          {/* Email */}
          <FormGroup className="mb-3">
            <div
              style={{
                backgroundColor: "#9cb4e2",
                borderRadius: "20px",
                padding: "10px 16px"
              }}
            >
              <div className="d-flex align-items-center">
                <span style={{ marginRight: "10px" }}>📧</span>
                <input
                  type="email"
                  className="form-control border-0"
                  style={{
                    backgroundColor: "transparent",
                    boxShadow: "none"
                  }}
                  placeholder="Email Address"
                  {...register("email")}
                />
              </div>
            </div>
            <small className="text-danger">{errors.email?.message}</small>
          </FormGroup>

          {/* Phone */}
          <FormGroup className="mb-3">
            <div
              style={{
                backgroundColor: "#9cb4e2",
                borderRadius: "20px",
                padding: "10px 16px"
              }}
            >
              <div className="d-flex align-items-center">
                <span style={{ marginRight: "10px" }}>📞</span>
                <input
                  className="form-control border-0"
                  style={{
                    backgroundColor: "transparent",
                    boxShadow: "none"
                  }}
                  placeholder="Phone Number"
                  {...register("phone")}
                />
              </div>
            </div>
            <small className="text-danger">{errors.phone?.message}</small>
          </FormGroup>

          {/* Password */}
          <FormGroup className="mb-3">
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
                  style={{
                    backgroundColor: "transparent",
                    boxShadow: "none"
                  }}
                  placeholder="Password"
                  {...register("pwd")}
                />
              </div>
            </div>
            <small className="text-danger">{errors.pwd?.message}</small>
          </FormGroup>

          {/* Confirm password */}
          <FormGroup className="mb-4">
            <div
              style={{
                backgroundColor: "#9cb4e2",
                borderRadius: "20px",
                padding: "10px 16px"
              }}
            >
              <div className="d-flex align-items-center">
                <span style={{ marginRight: "10px" }}>✅</span>
                <input
                  type="password"
                  className="form-control border-0"
                  style={{
                    backgroundColor: "transparent",
                    boxShadow: "none"
                  }}
                  placeholder="Confirm Password"
                  {...register("cnfPwd")}
                />
              </div>
            </div>
            <small className="text-danger">{errors.cnfPwd?.message}</small>
          </FormGroup>

          {/* Sign up button */}
          <Row className="mb-3">
            <Col className="text-center">
              <button
                type="submit"
                style={{
                  backgroundColor: "#3e005a",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "30px",
                  padding: "10px 60px",
                  fontSize: "1.4rem",
                  fontWeight: "bold"
                }}
              >
                Sign Up
              </button>
            </Col>
          </Row>

          {/* Already have an account */}
          <Row>
            <Col className="text-center">
              <span style={{ color: "#155b6a", fontSize: "1rem" }}>
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                style={{
                  color: "red",
                  fontWeight: "bold",
                  textDecoration: "none"
                }}
              >
                LOGIN
              </Link>
            </Col>
          </Row>

          {/* server / duplicate-account message */}
          {serverMsg && (
            <div className="alert alert-danger mt-3 text-center">
              {serverMsg}
            </div>
          )}
        </form>
      </Container>
    </Container>
  );
}
