import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const NavigationBar = () => {
  const { user, logOut } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>Your Voting App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user ? (
              <Nav.Item>
                <div className="d-flex align-items-center">
                  <p className="mr-2">Name: {user.name}</p>
                  <p className="mr-2">Email: {user.email}</p>
                  <Button variant="primary" className="mr-2">
                    Edit Profile
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </div>
              </Nav.Item>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
