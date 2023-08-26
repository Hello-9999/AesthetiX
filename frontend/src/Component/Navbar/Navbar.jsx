import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import IconButton from "@mui/material/IconButton";

import Badge from "@mui/material/Badge";

import AccountCircle from "@mui/icons-material/AccountCircle";

import MoreIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../Navbar/NavBar.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const Bar = () => {
  const handleMobileMenuOpen = () => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  const navigate = useNavigate();

  const cartpage = (e) => {
    e.preventDefault();

    navigate("/cart");
  };

  const storeData = useSelector((state) => state.login);

  console.log(storeData);

  const Logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const signin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-dark Navbarr">
        <Container fluid>
          <Navbar.Brand href="#">EazyBazar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
              id="links"
            >
              <Nav.Link href="/shop">Home</Nav.Link>
              <Nav.Link href="/shop">New Arrivals</Nav.Link>
              <Nav.Link href="/shop">Contact Us</Nav.Link>
              <Nav.Link href="/shop">News</Nav.Link>
            </Nav>

            <Box sx={{ flexGrow: 1 }} />
            <div className="nav-icon">
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge color="error">
                    <h6>
                      <FavoriteIcon />{" "}
                    </h6>
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={cartpage}
                >
                  <Badge color="error">
                    <h6>
                      {" "}
                      <ShoppingCartIcon />{" "}
                    </h6>
                  </Badge>
                </IconButton>

                <IconButton className="" style={{ color: "aliceblue" }}>
                  <NavDropdown
                    title={
                      <h6>
                        {" "}
                        {storeData.isLoggediin === true ? (
                          <>{storeData.Name} </>
                        ) : (
                          <>
                            {" "}
                            <AccountCircle />{" "}
                          </>
                        )}
                      </h6>
                    }
                    id="nav"
                  >
                    <NavDropdown.Item href="#action3">
                      {storeData.isLoggediin === true ? (
                        <>{storeData.Name}</>
                      ) : (
                        <>
                          {" "}
                          <Button onClick={signin} style={{ width: "100%" }}>
                            {" "}
                            Sign In{" "}
                          </Button>
                        </>
                      )}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      {storeData.isLoggediin === true ? (
                        <>
                          {" "}
                          <Button onClick={Logout}> Log out</Button>{" "}
                        </>
                      ) : (
                        <> </>
                      )}
                    </NavDropdown.Item>
                  </NavDropdown>
                </IconButton>
              </Box>
            </div>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Bar;
