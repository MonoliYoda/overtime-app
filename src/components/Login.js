import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../contexts/FirebaseContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, currentUser } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        maxWidth: 450,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        marginTop: "20%",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" component="h2">
          Log In
        </Typography>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        {currentUser && (
          <Alert severity="success">{`Successfully logged in as ${currentUser.email}`}</Alert>
        )}
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button onClick={handleSubmit}>Log In</Button>
      </CardActions>
      <CardActions>
        <Typography variant="body1">
          Don't have an account yet?&nbsp;
          <Link component={RouterLink} to="/signup">
            Sign up
          </Link>
        </Typography>
      </CardActions>
    </Card>
  );
}
