import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { signup, currentUser } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (password1 === password2) {
      setErrorMsg("");
      console.log("Passwords match!");
      signup(email, password1);
    } else {
      setErrorMsg("Passwords do not match!");
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
          Sign Up!
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
          id="password1"
          label="Password"
          type="password"
          variant="standard"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <TextField
          id="password2"
          label="Repeat password"
          type="password"
          variant="standard"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button onClick={handleSubmit}>Sign Up</Button>
      </CardActions>
      <CardActions>
        <Typography variant="body1">Already have an account?</Typography>
        <Button>Log In</Button>
      </CardActions>
    </Card>
  );
}
