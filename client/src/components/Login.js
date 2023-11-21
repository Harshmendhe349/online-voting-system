import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import 'firebase/auth'; // Import the authentication service
import { baseUrl } from "../utils/service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn,user } = useUserAuth();
  const navigate = useNavigate();

  const sendUserDataToBackend = async (userData) => {
    try {
      // POST user data to your backend API
      await fetch(`${baseUrl}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.error('Failed to send user data to backend:', error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      let username = '';
       username = user.email;
       let uid = user.uid;
       await sendUserDataToBackend({ username ,uid});
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      console.log("google sign in started")
      await googleSignIn();
      console.log("reached here")
      let username = '';
      username = user.email;
      let uid = user.uid;
      await sendUserDataToBackend({ username, uid });
      console.log(uid);
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle navigation to /phonesignin
  const handlePhoneSignIn = () => {
    navigate("/phonesignin");
  };

  return (
    <div className="flex">
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100" style={{ width: "800px"}}>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "1rem" }}>Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "300px", marginLeft: "50px", padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #ccc" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "300px", marginLeft: "50px", padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #ccc" }}
            />
          </Form.Group>

          <div style={{ textAlign: "center", padding: '5px 10px'  }}>
            <Button variant="primary" type="submit" style={{ padding: "0.5rem 1rem" }}>
              Log In
            </Button>
          </div>
        </Form>
        <div style={{ textAlign: "center", padding: "22px 0", paddingBottom: "10px" }}>
          <Button onClick={handlePhoneSignIn} variant="success" type="button" style={{ padding: "0.5rem 1rem" }}>
            Sign In with Phone Number
          </Button>
        </div>
        <div style={{ width: "500px", marginLeft: "80px", paddingBottom: "30px", textAlign: "center", marginTop: "1rem" }}>
          <GoogleButton
            className="g-btn mt-4"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100" style={{ width: "600px"}}>
      <h1>Let's Vote</h1>
    </div>
    </div>
  );
};

export default Login;
