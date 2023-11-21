import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import PhoneSignin from "./components/PhoneSignin";
import ElectionDetails from "./components/ElectionDetails";
import {baseUrl, getRequest } from "./utils/service"; // Assuming getRequest fetches election data
import Dashboard from "./components/Dashboard";

function App() {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    // Fetch elections data
    const fetchElections = async () => {
      try {
        const response = await getRequest(`${baseUrl}/elections`);
        setElections(response);
      } catch (error) {
        console.error("Failed to fetch elections:", error.message);
      }
    };

    fetchElections();
  }, []);

  return (
    <Container className="w-screen">
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/phonesignin" element={<PhoneSignin />} />
              <Route path="/signup" element={<Signup />} />

              {elections.map((election) => (
                <Route
                  key={election._id}
                  path={`/election/${election.link}`}
                  element={<ElectionDetails election={election} />}
                />
              ))}
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
