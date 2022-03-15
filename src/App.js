import "./App.css";
import { Container, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NewJob from "./components/NewJob";
import NewJobMenu from "./components/NewJobMenu";
import History from "./components/History";
import AppBarTop from "./components/AppBarTop";

function App() {
  return (
    <>
      <FirebaseProvider>
        <Router>
          <Container sx={{}}>
            <AppBarTop />
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/history" element={<History />} />
              <Route
                path="/new"
                element={
                  <>
                    <Dashboard />
                    <NewJob />
                  </>
                }
              />
              <Route
                path="/edit/:jobId"
                element={
                  <>
                    <Dashboard />
                    <NewJob />
                  </>
                }
              />
            </Routes>
            <Navbar />
          </Container>
          <NewJobMenu />
        </Router>
      </FirebaseProvider>
    </>
  );
}

export default App;
