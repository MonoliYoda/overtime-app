import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

export default function Signup() {
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
        <TextField id="email" label="Email" type="email" variant="standard" />
        <TextField
          id="password1"
          label="Password"
          type="password"
          variant="standard"
        />
        <TextField
          id="password2"
          label="Repeat password"
          type="password"
          variant="standard"
        />
      </CardContent>
      <CardActions>
        <Button>Sign Up</Button>
      </CardActions>
      <CardActions>
        <Typography variant="body1">Already have an account?</Typography>
        <Button>Log In</Button>
      </CardActions>
    </Card>
  );
}
