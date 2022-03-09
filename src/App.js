import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";
import { Container } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Container>
        <Signup />
      </Container>
    </AuthProvider>
  );
}

export default App;
