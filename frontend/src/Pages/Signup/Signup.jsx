import React, { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import {
  Button,
  TextField,
  CircularProgress,
  Grid,
  IconButton,
} from "@material-ui/core";
import { Postdata } from "../../services/axios.services";
import { useNavigate } from "react-router-dom";
import "../Signup/Signup.css";
import { sucesstoast, warningtoast } from "../../services/tostify.service";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpasswoard, setconfirmpasswoard] = useState("");
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [visible, setvisible] = useState(false);
  const [confirmvisible, setconfirmvisible] = useState(false);

  const Signupsubmithandler = async (e) => {
    e.preventDefault();
    const Signupdata = {
      email,
      password,
      name,
    };
    setloading(true);

    if (password !== confirmpasswoard) {
      warningtoast(
        "Uh-oh !!  Password and Confirm password mismatch. Please retype !!"
      );

      setloading(false);
    } else {
      const response = await Postdata(`auth/register`, Signupdata, setloading);
      setloading(false);

      if (response.data.status) {
        setloading(false);

        navigate("/");
        sucesstoast(
          "🎉 Account created! Welcome aboard and happy exploring !!"
        );
      }

      console.log(response.data);
    }
  };

  const passwoardshowhide = (e) => {
    e.preventDefault();
    setvisible(!visible);
  };

  const confirmpasswoardshowhide = (e) => {
    e.preventDefault();
    setconfirmvisible(!confirmvisible);
  };

  return (
    <Container
      fluid
      className="sign-up d-flex "
      style={{

        padding: "0",
        color: "aliceblue",
      }}
    >
      <Container fluid className="signup-text col-6">
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
          <h4 style={{ fontSize: "2.5rem" }} className="second-title mt-3">
            Sign Up Today! 🌟{" "}
          </h4>
          <p className="para mt-5" style={{ fontSize: "1.2rem" }}>
            🎉 Join us at EazyBazar ! Sign up today to access a tailored
            shopping experience, exclusive deals, and more. Let's get started!"
          </p>
        </Container>
      </Container>
      <Container className="col-6 signup-form">
        <h1
          style={{
            textAlign: "center",
            marginTop: "5%",
            marginBottom: "2%",
            color: "aliceblue",
          }}
        >
          Create your account
        </h1>
        <p>
          <div className="new" style={{ textAlign: "center" }}>
            <p>
              <p style={{ color: "#90cdf4" }}>
                Already have an account ? <a href="/"> Login</a>
              </p>
            </p>
          </div>
        </p>
        <div className="signup">
          <Form onSubmit={Signupsubmithandler} className="mt-5">
            <Form.Group>
              <Grid alignItems="flex-end">
                <Grid item>
                  <TextField
                    fullWidth
                    id="filled-basic"
                    variant="filled"
                    label="Enter Username"
                    autoComplete="off"
                    onChange={(e) => setname(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Form.Group>

            <Form.Group className="mt-5">
              <Grid alignItems="flex-end">
                <Grid item>
                  <TextField
                    fullWidth
                    id="filled-basic"
                    variant="filled"
                    label="Enter email address"
                    type="email"
                    autoComplete="off"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Form.Group>

            <Form.Group className="mt-5" style={{ position: "relative" }}>
              <Grid alignItems="flex-end">
                <Grid item>
                  <TextField
                    fullWidth
                    id="filled-basic"
                    variant="filled"
                    label="Enter your password"
                    type={visible ? "text" : "password"}
                    autoComplete="off"
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
                </Grid>
              </Grid>
            </Form.Group>

            <Form.Group style={{ position: "relative" }}>
              <Grid alignItems="flex-end" className="mt-5">
                <Grid item>
                  <TextField
                    fullWidth
                    id="filled-basic"
                    variant="filled"
                    label="Enter your confirm  password"
                    autoComplete="off"
                    onChange={(e) => setconfirmpasswoard(e.target.value)}
                    onClick={confirmpasswoardshowhide}
                    type={confirmvisible ? "text" : "password"}
                  />
                  <IconButton
                    className=" btn"
                    style={{
                      position: "absolute",
                      right: "5%",
                      backgroundColor: "transparent",
                    }}
                    onClick={confirmpasswoardshowhide}
                  >
                    {confirmvisible ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            </Form.Group>

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              disabled={loading}
              className="mt-5"
              fullWidth
            >
              {loading ? <CircularProgress /> : <>Create Account</>}
            </Button>
          </Form>
        </div>
      </Container>
    </Container>
  );
};

export default Signup;
