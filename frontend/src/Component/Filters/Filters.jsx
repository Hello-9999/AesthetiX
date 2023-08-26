import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Form, FormCheck } from "react-bootstrap";
import SortSharpIcon from "@mui/icons-material/SortSharp";
import { Button, Input, TextField } from "@mui/material";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../Navbar/Navbar.css";

const Filters = ({ value, handlesort, handlefilter, search }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Navbar
      expand="lg"
      className="second_nav"
      style={{ position: "sticky", zIndex: "999", top: "0" }}
    >
      <Container fluid style={{ gap: "10%" }}>
        <Navbar.Brand href="#">
          {" "}
          <div
            className="container  col-4"
            style={{ padding: "5px 0px", justifyContent: "space-between" }}
          >
            <h5 className=" "> Our Latest Product ( {value.length} )</h5>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex col-4" style={{ width: "65%" }}>
            <Form.Control
              type="search"
              placeholder="Search Product"
              className="me-2"
              aria-label="Search"
              onChange={(e) => search(e.target.value)}
            />
          </Form>

          <div className="filter  col-4">
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              <SortSharpIcon />
            </Button>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>
                <h5>Sort By </h5>
                <Form.Group>
                  <Form.Check
                    value="name"
                    label="Name "
                    onChange={(e) => handlesort(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    value="price"
                    label="price"
                    onChange={(e) => handlesort(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    value="rating"
                    label="Rating"
                    onChange={(e) => handlesort(e.target.value)}
                  />
                </Form.Group>

                <select
                  class="form-select"
                  onChange={(e) => handlefilter("category", e.target.value)}
                >
                  <option selected disabled>
                    Categories
                  </option>
                  <option> None </option>

                  <option> Shirt </option>
                  <option> Pants </option>
                  <option> Vest </option>
                </select>
              </Typography>
            </Popover>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Filters;
