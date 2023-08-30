import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../1page/1page.css";
import Homecarousel from "./Homecarousel";
function Homenav() {
  return (
    <>
      <div className="HomeNav">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#">EazyBazar</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{
                  maxHeight: "100px",
                  margin: "0% 10%",
                  gap: "5%",
                  width: "70%",
                  fontSize: "1rem",
                  fontWeight: " bold",
                }}
                navbarScroll
              >
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Men</Nav.Link>
                <Nav.Link href="#action3">Women</Nav.Link>
                <Nav.Link href="#action4">Baby Collection</Nav.Link>
              </Nav>
            

              <div className="icons d-flex">
                <div className="person">
                  <PermIdentityOutlinedIcon style={{ cursor: "pointer" }} />
                </div>

                <div className="cart">
                  <ShoppingCartOutlinedIcon style={{ cursor: "pointer" }} />
                </div>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </div>
    </>
  );
}

export default Homenav;
