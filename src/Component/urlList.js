import React, { useEffect, useState } from "react";
import BaseApp from "../BaseApp/baseApp";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import LinkIcon from "@mui/icons-material/Link";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AppState } from "../Context/AppProvider";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UrlList() {
  const { url, setUrl } = AppState();
  const navigate = useNavigate();
  const [longUrl, setLongUrl] = useState("");
  const [title, setTitle] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urlId, setUrlId] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const logout = () => {
    localStorage.removeItem("clintId");
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const edit = (Data) => {
    setTitle(Data.title);
    setLongUrl(Data.longUrl);
    setShortUrl(Data.shortUrl);
    setUrlId(Data._id);
    handleClickOpen();
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

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      logout();
    }
  }, []);

  const update = async () => {
    const data = {
      title,
      longUrl,
    };
    const response = await fetch(
      `https://url-shortener-xndv.onrender.com/shortURL/update/${urlId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    handleClose();
    getData();
  };

  const deleteUrl = async (id) => {
    const filterData = url.filter((data) => {
      return data._id !== id;
    });
    setUrl(filterData);
    const response = await fetch(
      `https://url-shortener-xndv.onrender.com/shortURL/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    getData();
  };

  return (
    <BaseApp>
      <div className="url-list-container">
        <Container>
          {url && url.length == 0 ? (
            <h3 className="text-center pt-3">No Url Created</h3>
          ) : null}
          {url &&
            url.map((data, index) => {
              return (
                <Row key={index}>
                  <Col className="lg-8">
                    <div className="urlList">
                      <div className="d-flex justify-content-between">
                        <h3>{data.title}</h3>
                        <div>
                          <button
                            style={{ backgroundColor: "red" }}
                            className="edit-btn"
                            onClick={() => deleteUrl(data._id)}
                          >
                            <DeleteIcon fontSize="small" /> Delete
                          </button>
                          <button
                            className="edit-btn"
                            onClick={() => edit(data)}
                          >
                            <ModeEditIcon fontSize="small" /> Edit
                          </button>
                        </div>
                      </div>
                      <div>
                        <a
                          style={{ color: "#011746" }}
                          href={data.longUrl}
                          target="_blank"
                        >
                          <SubdirectoryArrowRightIcon /> {data.longUrl}
                        </a>
                      </div>
                      <div className="d-flex flex-wrap">
                        <p>
                          Created On :{" "}
                          {new Date("2023-07-09T21:39:22.000+00:00")
                            .toLocaleString()
                            .split(",")}
                        </p>
                        <a
                          style={{ paddingLeft: "30px", color: "#011746" }}
                          href={`https://shorturl0.netlify.app/${data.shortUrl}`}
                          target="_blank"
                        >
                          <LinkIcon /> https://shorturl0.netlify.app/{data.shortUrl}
                        </a>
                        <span style={{ paddingLeft: "30px" }}>
                          <VisibilityIcon /> {data.clickCount}
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              );
            })}
        </Container>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"EDIT"}</DialogTitle>
        <DialogContent>
          <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
            <Form.Label style={{ fontWeight: "600" }}>
              Change Destination
            </Form.Label>
            <Form.Control
              type="url"
              pattern="https://.*"
              required
              placeholder="http://example.com/my-long-url"
              name="longUrl"
              defaultValue={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
            <Form.Label style={{ fontWeight: "600" }}>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              required
              name="title"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
            <Form.Label style={{ fontWeight: "600" }}>shortURL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Short Url"
              disabled
              name="shortUrl"
              defaultValue={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
            />
          </Form.Group>
          <button type="submit" onClick={() => update()} className="create-btn">
            SAVE
          </button>
        </DialogContent>
      </Dialog>
    </BaseApp>
  );
}
