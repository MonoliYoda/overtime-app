import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Router } from "react-router-dom";
import { Container, Switch } from "@mui/material";

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
      <Navbar />
    </Container>
  );
}

export default App;
