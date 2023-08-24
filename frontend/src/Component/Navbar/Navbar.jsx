import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import IconButton from "@mui/material/IconButton";

import Badge from "@mui/material/Badge";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../Navbar/NavBar.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

const Bar = () => {
  const handleProfileMenuOpen = () => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = () => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [SearchValue, setsearchvalue] = useState("");

  const menuId = "primary-search-account-menu";

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
      <div className="Navbar">
        <Navbar className="" style={{ borderBottom: "1px solid grey" }}>
          <Container style={{ justifyContent: "flex-start" }}>
            <Navbar.Brand>Check</Navbar.Brand>

            {/* <Form className="d-flex mx-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>setsearchvalue(e.target.value)}
              />
              {/* <Button variant="outline-success">Search</Button> */}

            <Nav
              className="me-auto my-2 my-lg-0 d-none"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3"></NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
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
                      Wishlist <FavoriteIcon />{" "}
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
                      Cart <ShoppingCartIcon />{" "}
                    </h6>
                  </Badge>
                </IconButton>

                <IconButton className="" style={{ color: "aliceblue" }}>
                  <NavDropdown
                    title={
                      <h6>
                        {" "}
                        {storeData.isLoggediin === true ? (
                          <>
                            {storeData.Name}
                            <ArrowDropDownOutlinedIcon />{" "}
                          </>
                        ) : (
                          <>
                            {" "}
                            <AccountCircle /> <ArrowDropDownOutlinedIcon />{" "}
                          </>
                        )}
                      </h6>
                    }
                    id="navbarScrollingDropdown"
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
          </Container>
        </Navbar>
      </div>
      {/* <Home SearchValue = {SearchValue} /> */}
    </>
  );
};

export default Bar;
