import React, { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { Button, TextField , CircularProgress} from "@material-ui/core";
import { Postdata } from "../../services/axios.services";
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpasswoard, setconfirmpasswoard] = useState("");
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()

  // setloading = <CircularProgressWithLabel value={progress} />


  const Signupsubmithandler =async(e)=>{
    e.preventDefault();
    const Signupdata ={
      email,
      password,
      confirmpasswoard,
      name,
    }
    console.log(Signupdata)

    
    const response = await Postdata(`auth/register`,Signupdata)
    console.log(response.data)

    if(response.data.status){
      setloading(true)

      console.log(response.data.message)
      navigate('/')


    }
   
    
    
  }
  return (
    <Container>
      <div className="SignupForm">
        <h1>Sign up</h1>
        

        <Form onSubmit={Signupsubmithandler}>
          <Form.Group>
            <TextField label="Enter your Full name" autoComplete="off" onChange={(e)=>setname(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <TextField label="Enter your email address" type="email" autoComplete="off" onChange={(e)=>setemail(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <TextField label="Enter your password" autoComplete="off" onChange={(e)=>setpassword(e.target.value)}/>
          </Form.Group>

          <Form.Group>
            <TextField label="Confirm your password" autoComplete="off" onChange={(e)=>setconfirmpasswoard(e.target.value)}/>
          </Form.Group>

          <Button variant="outlined" color="primary" type="submmit" disabled={loading}>
          
            Create Account
          </Button>
          {loading ? <CircularProgress color="red" /> : <>Create Account</> }
        </Form>
      </div>
    </Container>
  );
};

export default Signup;
