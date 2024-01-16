import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const userSchemaValidation = yup.object({
  firstName: yup
    .string()
    .required("First Name Required")
    .min(3, "Must be 3 characters or more"),
  lastName: yup
    .string()
    .required("Last Name Required")
    .min(3, "Must be 3 characters or more"),
  email: yup.string().email().required("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is Required")
    .min(7, "Password cannot be less than 7 characters"),
});

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      validationSchema: userSchemaValidation,
      onSubmit: async (data, { resetForm }) => {
        try {
          setLoading(true);
          const response = await fetch(
            "https://url-shortener-xndv.onrender.com/user/signup",
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
            handleClickOpen();
          }

          if (result.success == false) {
            toast.error(result.message);
          }
          if (result.success == true) {
            resetForm();
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
          <h3
            style={{
              fontWeight: "350",
              textAlign: "center",
              paddingBottom: "20px",
            }}
          >
            Sign up and start shortening
          </h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col className="pb-2">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="First name"
                  name="firstName"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.firstName && errors.firstName ? (
                  <p style={{ color: "crimson" }}>{errors.firstName}</p>
                ) : (
                  ""
                )}
              </Col>

              <Col className="pb-2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last name"
                  name="lastName"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.lastName && errors.lastName ? (
                  <p style={{ color: "crimson" }}>{errors.lastName}</p>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            {touched.email && errors.email ? (
              <p style={{ color: "crimson" }}>{errors.email}</p>
            ) : (
              ""
            )}
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            {touched.password && errors.password ? (
              <p style={{ color: "crimson" }}>{errors.password}</p>
            ) : (
              ""
            )}

            <Button className="w-100" variant="danger" type="submit">
              Next
            </Button>
          </Form>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link style={{ color: "#ffffff" }} to={"/login"}>
              Log In
            </Link>
          </p>
        </Col>
      </Row>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"A verification link has send to your email account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please click on the link that has just been sent to your email
            account to verify your email and continue the registration process.
            {"Note :"} Link valid for 15 minutes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
