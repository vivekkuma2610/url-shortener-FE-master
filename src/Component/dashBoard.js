import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BaseApp from "../BaseApp/baseApp";
import { AppState } from "../Context/AppProvider";

export default function Dashboard() {
  const { url, setUrl, userData, setUserData } = AppState();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("clintId");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      logout();
    } else {
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
          const response2 = await fetch(
            `https://url-shortener-xndv.onrender.com/user/profile/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data2 = await response2.json(); 
          setUserData(data2.data);

          if (data.success == false) {
            logout();
          }
          if (data2.success == false) {
            logout();
          }
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, []);

  var totalClickCount = 0;
  if (url != (null || undefined)) {
    for (var i = 0; i < url.length; i++) {
      totalClickCount = totalClickCount + Number(url[i].clickCount);
    }
  }

  return (
    <BaseApp>
      <h1 className="text-center pt-3">
        Welcome {userData != null ? userData.firstName : ""}
      </h1>
      <Container>
        <Row className="justify-content-around gap-4 mt-5">
          <Col
            md={3}
            style={{ backgroundColor: "#007c8c" }}
            className="dashboard"
          >
            <div className="border-bottom border-light">
              <h3 className="text-center pt-2">Total Clicks</h3>
            </div>
            <div className="text-center  p-2">
              <p>{totalClickCount}</p>
            </div>
          </Col>
          <Col md={3} className="dashboard">
            <div className="border-bottom border-light">
              <h3 className="text-center pt-2">Total Short URL</h3>
            </div>
            <div className="text-center  p-2">
              <p>{url != null ? url.length : ""}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </BaseApp>
  );
}
