import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BaseApp from "../BaseApp/baseApp";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { AppState } from "../Context/AppProvider";
import { useNavigate } from "react-router-dom";

const urlSchemaValidation = yup.object({
  longUrl: yup
    .string()
    .url()
    .required(`We'll need a valid URL, like "yourbrnd.co/niceurl"`),
  title: yup
    .string()
    .required("Title is Required")
    .min(4, "Title cannot be less than 4 characters"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateUrl() {
  const { setUrl } = AppState();
  const navigate = useNavigate();
  const userId = localStorage.getItem("clintId");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("clintId");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getData = async (req, res) => {
    try {
      const id = localStorage.getItem("clintId");
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://url-shortener-xndv.onrender.com/shortURL/data/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setUrl(data.data);

      if (data.success == false) {
        toast.error(data.message);
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        longUrl: "",
        title: "",
      },
      validationSchema: urlSchemaValidation,
      onSubmit: async (data, { resetForm }) => {
        try {
          setLoading(true);

          const response = await fetch(
            `https://url-shortener-xndv.onrender.com/shortURL/create/${userId}`,
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
            resetForm();
            handleClick();
            getData();
          } else {
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
    <BaseApp>
      {loading ? (
        <Box sx={{ width: "100vw" }}>
          <LinearProgress />
        </Box>
      ) : (
        " "
      )}
      <form onSubmit={handleSubmit}>
        <Container>
          <Row className="justify-content-center">
            <Col lg="8" className="pt-4">
              <h3 style={{ fontWeight: "1000" }}>Create new URL</h3>
              <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
                <Form.Label style={{ fontWeight: "600" }}>
                  Destination
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="http://example.com/my-long-url"
                  name="longUrl"
                  value={values.longUrl}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.longUrl && errors.longUrl ? (
                  <p style={{ color: "crimson" }}>{errors.longUrl}</p>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
                <Form.Label style={{ fontWeight: "600" }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.title && errors.title ? (
                  <p style={{ color: "crimson" }}>{errors.title}</p>
                ) : (
                  ""
                )}
              </Form.Group>
              <button type="submit" className="create-btn">
                Create
              </button>
            </Col>
          </Row>
        </Container>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Short URL Created Successfully
        </Alert>
      </Snackbar>
    </BaseApp>
  );
}
