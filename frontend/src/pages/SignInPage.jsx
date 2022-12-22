import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SigninScreen() {
  const userInfo = "";

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("api/users/signin", {
        email,
        password,
      });
      navigate("/admin");
      console.log(data.message)
    } catch (err) {
      alert(err.message)
    }
  };

  return (
    <Container className="small-container sigin">
      <h1 className="my-3 signin-label"  >Sign In</h1>
      <Form onSubmit={submitHandler} id= "sign-in-form">
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="signin-label">Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="signin-label">Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <div className="mb-3" id =  "signinButton" >
          <Button   type="submit" > Sign In</Button>
        </div>
      </Form>
      j
    </Container>
  );
}

export default SigninScreen;
