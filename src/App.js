import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import PhoneSignin from "./components/PhoneSignin";
import AdminPage from "./components/Admin"; 

function App() {
  return (
    <Container className="w-screen">
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/phonesignin" element={<PhoneSignin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/adminPage" element={<AdminPage />} /> {/* Update path for AdminPage */}
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
