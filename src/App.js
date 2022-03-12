import "./App.css";
import { AppBar, Container, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NewJob from "./components/NewJob";
import NewJobMenu from "./components/NewJobMenu";

function App() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="x1">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Container>
      </AppBar>

      <Container sx={{}}>
        <FirebaseProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route
                path="/new"
                element={
                  <>
                    <Dashboard />
                    <NewJob />
                  </>
                }
              />
            </Routes>
            <NewJobMenu />
            <Navbar />
          </Router>
        </FirebaseProvider>
      </Container>
    </>
  );
}

export default App;
