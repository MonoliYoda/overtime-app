import "./App.css";
import { Container, Switch } from "@mui/material";
import { Route, Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Container>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/signup" component={Signup} />
          </Switch>
        </AuthProvider>
      </Router>
      <Navbar />
    </Container>
  );
}

export default App;
