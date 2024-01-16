import React from "react";
import "boxicons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

export default function NoPage() {
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <box-icon name="chart" type="solid" color="#1462fe"></box-icon>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={() => navigate("/login")}>
                Log In
              </Nav.Link>
              <Nav.Link href="#">sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content text-center">
        <h1 className="mt-5">Something's wrong here.</h1>
        <p className="mt-3">
          This is a 404 error, which means you've clicked on a bad link or
          entered an invalid URL. Maybe what you are looking for can be found at
          Bitly.com.
        </p>
      </div>
    </div>
  );
}
