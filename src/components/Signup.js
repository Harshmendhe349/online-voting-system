import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100" style={{ width: "600px" }}>
      <div className="w-full max-w-md bg-white p-6 pt-8 pb-8 rounded-lg shadow-lg">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "1rem",paddingTop:"30px" }}>Sign up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit} style={{paddingTop:"20px",paddingBottom:"50px"}}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "400px", marginLeft: "100px", padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #ccc" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "400px", marginLeft: "100px", padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #ccc" }}
            />
          </Form.Group>

          <div style={{ textAlign: "center" }}>
            <Button variant="primary" type="submit" style={{ padding: "0.5rem 1rem" }}>
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
