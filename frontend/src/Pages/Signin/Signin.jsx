import React, { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import {
  Button,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";

import { Postdata } from "../../services/axios.services";
import { useNavigate } from "react-router-dom";

import "../Signin/Signin.css";
import { useDispatch } from "react-redux";

import { login } from "../../slice/loginslice";
import { Dna, FallingLines } from "react-loader-spinner";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [userData, setuserData] = useState({});
  const [visible, setvisible] = useState(false);
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
      console.log(data);

      navigate("/home");
      setloading(false);
    } else {
      setloading(false);
    }

    console.log(response.data);
  };

  const passwoardshowhide = (e) => {
    e.preventDefault();
    setvisible(!visible);
  };


  return (
    <>
      <Container fluid className="login-form d-flex" style={{height:'100vh'}}>
        <Container fluid className="login-text col-6">
          <div className="logo mt-4 mx-2">
            <h6>
              {" "}
              <a href="" style={{ textDecoration: "none" }}>
                {" "}
                Eazy<span>Bazar. </span>{" "}
              </a>
            </h6>
          </div>

          <Container
            className="Text "
            style={{ textAlign: "center", marginTop: "30%", width: "80%" }}
          >
            <h6 className="title" style={{ fontSize: "1.2rem" }}>
              Nice to see you again !!
            </h6>
            <h4 style={{ fontSize: "2.5rem" }} className="second-title mt-3">
              Welcome Back 👋{" "}
            </h4>
            <p className="para mt-3" style={{ fontSize: "1.2rem" }}>
              Whether you're on the hunt for fashion, gadgets, or more, we've
              got you covered. Sign in to access a world of curated products and
              a seamless shopping experience. Feel free to explore, shop, and
              enjoy!
            </p>
          </Container>
        </Container>

        <Container className="col-6 signin">
          <h1
            style={{
              textAlign: "center",
              marginBottom: "2%",
              color: "aliceblue",
            }}
            className="mt-5"
          >
            Sign in your account
          </h1>
          <p>
            <div className="new" style={{ textAlign: "center" }}>
              <p>
                <p style={{ color: "#90cdf4" }}>
                  Don't have account ? <a href="/signup"> Create Account</a>
                </p>
              </p>
            </div>
          </p>
          <div className="login">
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
              <Form.Group className="mt-5" style={{ position: "relative" }}>
                <Grid alignItems="flex-end">
                  <TextField
                    fullWidth
                    id="filled-basic"
                    variant="filled"
                    label="Password"
                    type={visible ? "text" : "password"}
                    onChange={(e) => setpassword(e.target.value)}
                  />

                  <IconButton
                    className=" btn"
                    style={{
                      position: "absolute",
                      right: "5%",
                      backgroundColor: "transparent",
                    }}
                    onClick={passwoardshowhide}
                  >
                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>

                  <Form.Group
                    className="d-flex rember"
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
      </Container>
    </>
  );
};

export default Signin;
