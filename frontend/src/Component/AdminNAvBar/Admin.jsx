import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ProductList from "../../Pages/Admin/ProductList";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminNavBar({Addprod}) {
  const navigate = useNavigate()
  

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">PRODUCT ADMIN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='admin'>Dashboard</Nav.Link>
            <NavDropdown title="Reports" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Daily Report
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Weekly Report
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Yearly Report
              </NavDropdown.Item>
            
            </NavDropdown>

            <Nav.Link href="#home">Products</Nav.Link>
            <Nav.Link href="#home">Account</Nav.Link>
            {/* <Nav.Link href="#home">Products</Nav.Link> */}
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Billing</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Customize
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Button onClick={Addprod}> Add Product </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavBar;
