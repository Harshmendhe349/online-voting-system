import React from "react";
import { Button, Card, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const elections = [
    {
      id: 1,
      title: "City Council Election",
      date: "2023-12-15",
      description: "Vote for your favorite candidates for the City Council.",
    },
    {
      id: 2,
      title: "National Referendum",
      date: "2024-01-20",
      description: "Have your say on an important national issue.",
    },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleVote = (electionId) => {
    navigate(`/vote/${electionId}`);
  };

  return (
    <div className="bg-blue-100 min-h-screen p-4 " >
      <Navbar bg="blue" variant="light" className="navbar-light bg-info justify-contdent-between mb-4" style={{width:"1300px"}}>
        <Navbar.Brand>Online Voting </Navbar.Brand>
        <div style={{marginLeft:"900px"}}>
        <Nav className="mr-auto">
          {user && (
            <Nav.Link onClick={() => navigate("/edit-profile")}>Edit Profile</Nav.Link>
            )}
        </Nav>
            </div>
        <Button
          variant="outline-danger"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Navbar>

      <div className="text-center mt-4">
        <h2 className="text-3xl font-bold mb-4">Hello, User!</h2>
        {user && (
          <p className="text-lg font-semibold">{user.email}</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-3">Available Elections</h3>
        {elections.map((election) => (
          <Card key={election.id} className="mb-3" style={{ width: "20rem"}}>
            <Card.Body>
              <Card.Title className="text-xl font-semibold">
                {election.title}
              </Card.Title>
              <Card.Text>Date: {election.date}</Card.Text>
              <Card.Text>Description: {election.description}</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleVote(election.id)}
                className="mt-3"
              >
                Vote
              </Button>
            </Card.Body>  
          </Card>
        ))}
      </div>

    </div>
  );
};

export default Home;
