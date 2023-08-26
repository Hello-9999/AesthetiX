import Modal from "react-bootstrap/Modal";
// import Signin from '../Signin/Signin';
import React, { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import {
  Button,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import { Postdata } from "../../services/axios.services";
import { useNavigate } from "react-router-dom";

import "../Signin/Signin.css";
import { useDispatch } from "react-redux";

import { login } from "../../slice/loginslice";
import { Dna, FallingLines } from "react-loader-spinner";
import "../Cart/cart.css";
import Signup from "../Signup/Signup";
import Signin from "../Signin/Signin";

function SigninModal({ Display, Hide, setDisplay }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [userData, setuserData] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginsubmithandler = async (e) => {
    e.preventDefault();

    setloading(true);

    const logindata = {
      email,
      password,
    };

    const response = await Postdata(`auth/login`, logindata, setloading);
    setuserData(response.data);
    const data = {
      name: response.data.authData.name,
      email: response.data.authData.email,
      role: response.data.authData.role,
      token: response.data.token,
    };

    if (response.data.status === "success") {
      dispatch(login(data));

      setloading(false);
      setDisplay(false);
    } else {
      setloading(false);
    }

    console.log(response);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Cart, setCart] = useState(false);

  const createaccount = (e) => {
    e.preventDefault();
    console.log("firsggt");
  
    setCart(true);
    navigate("/signup");
  };

  console.log(Cart);

  return (
    <>
     
      <div style={{display:'none'}}>
        <Signin  Cart={Cart} />
      </div>

      <Modal
        show={Display}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
        className="loginsigup_box"
      >
        <Modal.Header>
          <Modal.Title style={{ margin: "auto" }}>
            {" "}
            <h1
              style={{
                textAlign: "center",
                marginTop: "5%",
                marginBottom: "2%",
                color: "aliceblue",
                fontSize: "2.3rem",
              }}
            >
              Sign in your account
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="" id="signup" style={{ display: "none" }}>
            {" "}
            <Signup login={login} />{" "}
          </div>{" "}
          <div className="login" id="login">
            <p style={{ marginTop: "10%", fontSize: "1.3rem" }}>
              <div className="new" style={{ textAlign: "center" }}>
                <p>
                  <p style={{ color: "#90cdf4" }}>
                    Don't have account ?{" "}
                    <a href="" onClick={createaccount}>
                      {" "}
                      Create Account
                    </a>
                  </p>
                </p>
              </div>
            </p>

            {console.log(createaccount)}
            <Container className="login-form">
              <div className="login" style={{ width: "100%" }}>
                <Form onSubmit={loginsubmithandler} className="mt-5">
                  <Form.Group>
                    <Grid>
                      <Grid item>
                        <TextField
                          fullWidth
                          id="filled-basic"
                          variant="filled"
                          label="Email"
                          placeholder="Enter your email"
                          type="email"
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Form.Group>

                  <Form.Group className="mt-5">
                    <Grid alignItems="flex-end">
                      <TextField
                        fullWidth
                        id="filled-basic"
                        variant="filled"
                        label="Password"
                        onChange={(e) => setpassword(e.target.value)}
                      />

                      <Form.Group
                        className="d-flex"
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          // marginBottom: "1rem",
                          marginLeft: "1rem",
                          marginRight: "1rem",
                          marginTop: "1rem",
                          width: "85%",
                        }}
                      >
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Remember me "
                          className="float-start"
                        />
                        <div className="float-end">
                          <a href="" style={{ textDecoration: "none" }}>
                            {" "}
                            Forgot password
                          </a>
                        </div>
                      </Form.Group>
                    </Grid>
                  </Form.Group>
                  <Form.Group className="m-auto lgn-button mt-5">
                    <Button type="submit" fullWidth disabled={loading}>
                      {loading ? (
                        <>
                          {" "}
                          <Dna
                            visible={true}
                            height="50"
                            width="100%"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                          />{" "}
                        </>
                      ) : (
                        <>Login</>
                      )}
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </Container>
          </div>
        </Modal.Body>
      </Modal>

      {/* <Signup /> */}
    </>
  );
}

export default SigninModal;
