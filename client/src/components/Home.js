import React, { useState, useEffect } from "react";
import { Button, Card, Nav, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { baseUrl, getRequest, postRequest } from "../utils/service";
import { v4 as uuidv4 } from 'uuid';
import ElectionDetails from "./ElectionDetails";
import Navbar from "./Navbar";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [elections, setElections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedElection, setSelectedElection] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(null);

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const response = await getRequest(`${baseUrl}/elections`);
      setElections(response);
    } catch (error) {
      console.error("Failed to fetch elections:", error.message);
    }
  };

  const handleCreateElection = async (e) => {
    e.preventDefault();

    try {
      // Validate form fields
      if (!title || !date || !description) {
        setError("Please fill in all fields");
        return;
      }

      setError("");
      const formattedDate = new Date(date).toISOString().split("T")[0];

      let createdBy = "";
      if (user) {
        createdBy = user.email || user.phoneNumber;
      }
      const uniqueLink = uuidv4();

      await postRequest(`${baseUrl}/elections`, {
        title,
        date: formattedDate,
        description,
        created_by: createdBy,
        link: uniqueLink, // Associate the unique link with the election
      });

      setTitle("");
      setDate("");
      setDescription("");
      fetchElections();
      toggleModal(); // Close the modal after creating election
    } catch (error) {
      setError("Failed to create election");
      console.error("Failed to create election:", error.message);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDeleteElection = async (electionId) => {
    try {
      await fetch(`${baseUrl}/elections/${electionId}`, {
        method: 'DELETE',
      });

      fetchElections(); // Refresh elections after deletion
    } catch (error) {
      setError('Failed to delete election');
      console.error('Failed to delete election:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleVote = async (electionTitle, index) => {
    try {
      await postRequest(`${baseUrl}/vote`, { title: electionTitle });
      const updatedElections = [...elections];
      updatedElections[index].voted = true;
      updatedElections[index].votes += 1;
      setElections(updatedElections);
    } catch (error) {
      setError('Failed to vote');
      console.error('Failed to vote:', error.message);
    }
  };

  const handleElectionClick = (election) => {
    setSelectedElection(election);
    toggleDetailsModal();
  };
  const toggleDetailsModal = () => {
    setShowDetailsModal(!showDetailsModal);
  };


  return (
    <div className="bg-blue-100 min-h-screen p-4" style={{ width: '110%', display: 'flex', flexDirection: 'column' }}>
      <Navbar/>
      {/* <Navbar bg="blue" variant="light" className="navbar-light bg-info justify-content-between mb-4" style={{ width: "1300px" }}>
        <Navbar.Brand>Online Voting</Navbar.Brand>
        <div style={{ marginLeft: "900px" }}>
          <Nav className="mr-auto">
            {user && (
              <Nav.Link onClick={() => navigate("/edit-profile")}>Edit Profile</Nav.Link>
            )}
          </Nav>
        </div>
        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
      </Navbar> */}
      <br></br><br></br>
      <div className="text-center mt-4">
        {user && (
          <h2 className="text-3xl font-bold mb-4">Hello, {user.email || user.phoneNumber}!</h2>
        )}
      </div>

      <div className="mt-6 flex-grow" style={{ overflowY: 'auto' }}>
        <h3 className="text-2xl font-semibold mb-3">Available Elections</h3>
        <div className="mt-6" style={{ display: "flex", flexWrap: "wrap" }}>

          {elections.map((election, index) => (
            <div key={election._id} style={{ flex: "0 0 33.33%", padding: "7px" }}>
              <Card className="mb-3" style={{ width: "24rem" }}>
                <Card.Body>
                  <Card.Title className="text-xl font-semibold">
                    {election.title}
                  </Card.Title>

                  <Card.Text>Date: {election.date}</Card.Text>
                  <Card.Text>Description: {election.description}</Card.Text>
                  {user && (user.email === election.created_by || user.phoneNumber === election.created_by) && (
                    <p>Shareable Link: http://localhost:3000/election/{election.link}</p>

                  )}

                  {election.voted ? (
                    <p>Votes: {election.votes}</p>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleVote(election.title, index)}
                      className="mt-3"
                      style={{ margin: "0.5rem" }}
                    >
                      Vote
                    </Button>
                  )}
                  {user && (user.email === election.created_by || user.phoneNumber === election.created_by) && ( // Check if the logged-in user is the creator

                    <Button
                      variant="danger"
                      onClick={() => handleDeleteElection(election._id)}
                      className="mt-3"
                      style={{ margin: "0.5rem" }}
                    >
                      Delete
                    </Button>

                  )}

                  <Button onClick={() => handleElectionClick(election)}  style={{ margin: "0.4rem 0.2rem",  }}>
                    View Details
                  </Button>

                </Card.Body>
              </Card>

            </div>
          ))}
          {selectedElection && (
            <ElectionDetails
              election={selectedElection}
              showModal={showDetailsModal}
              toggleModal={toggleDetailsModal}
            />
          )}
        </div>

        <div className="mt-6">
          <Button variant="primary" onClick={toggleModal}>Create Election</Button>

          <Modal show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton>
              <Modal.Title>Create Election</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <form onSubmit={handleCreateElection}>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ display: "block", margin: "8px 0", padding: "8px" }}
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ display: "block", margin: "8px 0", padding: "8px" }}
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    display: "block",
                    margin: "8px 0",
                    padding: "8px",
                    minHeight: "100px",
                  }}
                ></textarea>
                <Button type="submit" variant="success" className="mt-3">Create Election</Button>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Home;
