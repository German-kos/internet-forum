import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Swal from "sweetalert2";
import { banReason, isBanned } from "../../Resources/functions";

const theme = createTheme();

function SignIn({ user, setUser }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get("./files/users.json").then((res) => {
      const tempUser = res.data.find(
        (obj) =>
          obj.username.toLowerCase() === e.target[0].value.toLowerCase() &&
          obj.password === e.target[2].value
      );
      if (tempUser !== undefined) {
        if (isBanned(tempUser?.userID)) {
          Swal.fire({
            icon: "error",
            title: "Your account has been suspended!",
            html: `Reason: ${banReason(
              tempUser?.userID
            )} <br><br>For ban appeals contact us via Email: Administrator@Mail.com.`,
          });
        } else {
          setUser(tempUser);
          if (tempUser !== undefined && tempUser !== null) {
            delete tempUser.password;
            localStorage.setItem("currUser", JSON.stringify(tempUser));
          }
        }
      } else {
        Swal.fire({
          icon: "error",

          text: "Username or password do not match.",
        });
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default SignIn;
