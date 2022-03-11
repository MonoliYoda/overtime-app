import "./App.css";
import { Container, Switch } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  return (
    <Container sx={{}}>
      <FirebaseProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
        <Navbar />
      </FirebaseProvider>
    </Container>
  );
}

export default App;
