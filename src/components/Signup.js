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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import withContext from "../withContext";

function Signup(props) {
  const fb = { ...props.value };
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (fb.currentUser) {
      navigate("/");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password1 === password2) {
      setErrorMsg("");
      try {
        await fb.signup(email, password1);
        navigate("/");
      } catch (e) {
        console.log(e);
        setErrorMsg("Failed creating account.");
      }
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
          Sign Up!
        </Typography>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        {fb.currentUser && (
          <Alert severity="success">{`Successfully logged in as ${fb.currentUser.email}`}</Alert>
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
        <Typography>
          Already have an account?&nbsp;
          <Link component={RouterLink} to="/login">
            Log In
          </Link>
        </Typography>
      </CardActions>
    </Card>
  );
}

export default withContext(Signup);
