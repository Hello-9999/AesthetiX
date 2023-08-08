import React, { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { Button, TextField, CircularProgress, Grid } from "@material-ui/core";
import { Postdata } from "../../services/axios.services";
import { useNavigate } from "react-router-dom";
import "../Signup/Signup.css";
import PasswordIcon from "@mui/icons-material/Password";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpasswoard, setconfirmpasswoard] = useState("");
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  // setloading = <CircularProgressWithLabel value={progress} />

  const Signupsubmithandler = async (e) => {
    e.preventDefault();
    const Signupdata = {
      email,
      password,
      // confirmpasswoard,
      name,
    };
    console.log(Signupdata);

    if(password !== confirmpasswoard){

      alert('pasdasd')

    }else{

      const response = await Postdata(`auth/register`, Signupdata);
      console.log(response.data);
  
      if (response.data.status) {
        setloading(true);
  
        console.log(response.data.message);
        navigate("/");
      }

    }


  };
  return (
    <Container>
      <div className="signup">
        <h1>Sign up</h1>

        <Form onSubmit={Signupsubmithandler}>
          <Form.Group>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <PersonRoundedIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Enter Username"
                  // placeholder="Enter your fullname"
                  autoComplete="off"
                  onChange={(e) => setname(e.target.value)}
                />
              </Grid>
            </Grid>
          </Form.Group>
          {/* <Form.Group>
            <TextField label="Enter your Full name" autoComplete="off" onChange={(e)=>setname(e.target.value)} />
          </Form.Group> */}

          <Form.Group>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <MailOutlineRoundedIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Enter email address"
                  type="email"
                  autoComplete="off"
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
                  label="Enter your password"
                  autoComplete="off"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Grid>
            </Grid>
          </Form.Group>

        

          <Form.Group>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <CheckRoundedIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Confirm your password"
                  autoComplete="off"
                  onChange={(e) => setconfirmpasswoard(e.target.value)}
                />
              </Grid>
            </Grid>
          </Form.Group>

 

          <Button
            variant="outlined"
            color="primary"
            type="submmit"
            disabled={loading}
            
          >
           Create Account
          </Button>
          {/* {loading ? <CircularProgress color="red" /> : <>Create Account</>} */}
        </Form>
      </div>
    </Container>
  );
};

export default Signup;
