import React, { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { Button, TextField, CircularProgress, Grid } from "@material-ui/core";
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';

import { Postdata } from "../../services/axios.services";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import '../Signin/Signin.css'

const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginsubmithandler = async (e) => {
    e.preventDefault();

    const logindata = {
      email,
      password,
    };

    const response = await Postdata(`auth/login`, logindata);
    console.log(response);

    if (response.data.status === "success") {
      // dispatch(auth)

      navigate("/home");
    }
  };
  return (
    <>
      <div className="login">
        <h1>Signin</h1>

        <Form onSubmit={loginsubmithandler}>
          <Form.Group>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <EmailIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </Grid>
            </Grid>
          </Form.Group>

          <Form.Group>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <PasswordIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Password"
                  placeholder="Enter your password"
           
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Grid>
            </Grid>
          </Form.Group>
          <Form.Group className="m-auto lgn-button">
          <Button type="submit">Login</Button>

          </Form.Group>

          <div className="new">

            <p><a href="/signup"> Create Account</a></p>

          </div>




        </Form>
      </div>
    </>
  );
};

export default Signin;
