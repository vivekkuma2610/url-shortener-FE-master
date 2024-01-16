import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const userSchemaValidation = yup.object({
  password: yup
    .string()
    .required("Password is Required")
    .min(7, "Password cannot be less than 7 characters"),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
      },
      validationSchema: userSchemaValidation,
      onSubmit: async (data, { resetForm }) => { 
        try {
          setLoading(true);
          const response = await fetch(
            `https://url-shortener-xndv.onrender.com/user/reset-password/${id}/${token}`,
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            } 
          );
          const result = await response.json();
          if (result.success == true) {
            toast.success(result.message);
            navigate("/login");
          }
          if (result.success == false) {
            toast.error(result.message);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      },
    });
  return (
    <Container fluid className="login-container">
      {loading ? (
        <Box sx={{ width: "100vw" }}>
          <LinearProgress color="success" />
        </Box>
      ) : (
        " "
      )}
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <h1
            style={{
              fontWeight: "1000",
              paddingLeft: "20px",
              paddingTop: "10px",
            }}
          >
            URL Shortener
          </h1>
        </span>
      </div>
      <Row className="mt-5 justify-content-around align-items-center">
        <Col className="login-content" md={4}>
          <h1>
            THE IDEA IS TO MINIMIZE THE WEB PAGE ADDRESS INTO SOMETHING THAT'S
            EASIER TO REMEMBER AND TRACK.
          </h1>
        </Col>
        <Col md={4}>
          <h3 style={{ fontWeight: "350", textAlign: "center" }}>
            Forget Your Password
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                placeholder="Enter new password"
              />
            </Form.Group>
            {touched.password && errors.password ? (
              <p style={{ color: "crimson" }}>{errors.password}</p>
            ) : (
              ""
            )}
            <Button className="w-100" variant="danger" type="submit">
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
