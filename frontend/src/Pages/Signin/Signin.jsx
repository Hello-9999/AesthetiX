import React, { useState } from 'react'
import { Container, Form, Row } from "react-bootstrap";
import { Button, TextField , CircularProgress} from "@material-ui/core";
import { Postdata } from '../../services/axios.services';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  
  const [email ,setemail] = useState('')
  const [password ,setpassword] =useState('')
  const navigate = useNavigate()

  const loginsubmithandler = async(e)=>{
    e.preventDefault();

    const logindata ={
      email,
      password
    }

    const response = await Postdata(`auth/login`,logindata)
    console.log(response)

    if(response.data.status === 'success'){

      navigate('/home')
    }

  

 


  }
  return (
    <>
    <div className='login'>

      <h1>Signin</h1>

      <Form onSubmit={loginsubmithandler}>
        <Form.Group>
          <TextField label='Email' placeholder='Enter your email'  onChange={(e)=>setemail(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <TextField label='Password' placeholder='Enter your password'  onChange={(e)=>setpassword(e.target.value)}/>
        </Form.Group>

        <Button type='submit'>Login</Button>
        
      </Form>

    </div>
          
     </>
  )
}

export default Signin