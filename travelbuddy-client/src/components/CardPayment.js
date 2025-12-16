import { Container, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import paymentValidationSchema from "../validations/paymentValidation";

// images
import visaImg from "../images/visa.png";
import amexImg from "../images/american-express.png";
import cardsImg from "../images/credit-card.png";

export default function CardPayment() {
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("info"); // success | error | info

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(paymentValidationSchema),
  });

 const onPay = async (formData) => {
  setMsg(""); // clear old msg

  try {
    // (student demo) fake amount
    const amount = 2.0;

    const res = await fetch("http://localhost:7500/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        paymentMethod: "card",
        // bookingId: optional (send it only if you have it)
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.flag) {
      setMsg(data.msg || "Payment failed");
      return;
    }

    setMsg("Paid Successfully ✔");
    // reset(); // optional
  } catch (err) {
    console.log(err);
    setMsg("Server error, please try again.");
  }
};


  const fieldStyle = {
    borderRadius: "18px",
    padding: "18px",
    fontSize: "1.1rem",
    border: "2px solid #000",
  };

  const errorStyle = {
    color: "red",
    fontWeight: "600",
    marginTop: "8px",
  };

  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        paddingTop: "30px",
      }}
    >
      <Container style={{ maxWidth: "980px" }}>
        <Row>
          <Col>
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "700",
                color: "#000",
                marginBottom: "6px",
              }}
            >
              Card
            </h1>

            <div style={{ display: "flex", gap: "14px", marginBottom: "28px" }}>
              <img src={visaImg} alt="Visa" style={{ height: "50px" }} />
              <img src={cardsImg} alt="Cards" style={{ height: "50px" }} />
              <img src={amexImg} alt="Amex" style={{ height: "50px" }} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <form onSubmit={handleSubmit(onPay)}>
              <FormGroup style={{ marginBottom: "28px" }}>
                <Label style={{ fontSize: "2rem", fontWeight: "600" }}>
                  Name on card
                </Label>
                <input className="form-control" style={fieldStyle} {...register("name")} />
                {errors.name && <div style={errorStyle}>{errors.name.message}</div>}
              </FormGroup>

              <FormGroup style={{ marginBottom: "40px" }}>
                <Label style={{ fontSize: "2rem", fontWeight: "600" }}>
                  Card number
                </Label>
                <input
                  className="form-control"
                  style={fieldStyle}
                  placeholder="1234 5678 9012 3456"
                  {...register("number")}
                />
                {errors.number && <div style={errorStyle}>{errors.number.message}</div>}
              </FormGroup>

              <Row style={{ marginBottom: "40px" }}>
                <Col md="6">
                  <FormGroup>
                    <Label style={{ fontSize: "2rem", fontWeight: "600" }}>
                      Expire date
                    </Label>
                    <div style={{ fontSize: "1.4rem", color: "#777" }}>
                      Format: MM/YY
                    </div>
                    <input
                      className="form-control"
                      style={fieldStyle}
                      placeholder="08/27"
                      {...register("exp")}
                    />
                    {errors.exp && <div style={errorStyle}>{errors.exp.message}</div>}
                  </FormGroup>
                </Col>

                <Col md="6">
                  <FormGroup>
                    <Label style={{ fontSize: "2rem", fontWeight: "600" }}>
                      Security code (cvv)
                    </Label>
                    <div style={{ fontSize: "1.4rem", color: "#777" }}>
                      3 or 4 digits
                    </div>
                    <input
                      className="form-control"
                      style={fieldStyle}
                      placeholder="123"
                      {...register("cvv")}
                    />
                    {errors.cvv && <div style={errorStyle}>{errors.cvv.message}</div>}
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: "#5a28c8",
                      border: "none",
                      borderRadius: "22px",
                      padding: "16px 60px",
                      fontSize: "1.6rem",
                      fontWeight: "600",
                      width: "60%",
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                  >
                    Pay
                  </Button>
                </Col>
              </Row>

              {msg && (
                <div
                  className={`text-center mt-4 ${
                    msgType === "success"
                      ? "text-success"
                      : msgType === "error"
                      ? "text-danger"
                      : "text-info"
                  }`}
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                  }}
                >
                  {msg}
                </div>
              )}
            </form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
