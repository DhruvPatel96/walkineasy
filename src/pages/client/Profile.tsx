import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, TextField } from "@mui/material";

export default function ClientProfile() {
  return (
    <>
      <Box sx={{ flexGrow: 29 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
              HomePage
            </Typography>
            <Button color="inherit" size="large">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              height: "83vh",
              flexWrap: "wrap",
              flexDirection: "column",
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                borderRadius: 2,
                marginTop: 5,
                bgcolor: "#cfe8fc",
                "& > :not(style)": {
                  m: 1,
                  width: "85vw",
                  height: "70vh",
                },
              }}
            >
              <Paper elevation={3}>
                <TextField
                  id="standard-read-only-input"
                  defaultValue="Client Profile"
                  InputProps={{
                    readOnly: true,
                    style: {
                      paddingLeft: "20px",
                      fontWeight: "bold",
                      color: "#0089ED",
                    },
                  }}
                  margin="dense"
                  fullWidth
                  size="medium"
                  variant="standard"
                />
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={2}
                  padding={4}
                  marginTop={3}
                >
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-basic"
                      required
                      autoFocus
                      label="Full Name"
                      variant="outlined"
                      placeholder="Enter your Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      label="Email id"
                      type="email"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your Email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      label="Contact No"
                      type="number"
                      placeholder="Enter your Number"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      label="Address"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your Address"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="outlined-password-input"
                      type="password"
                      autoComplete="current-password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter Password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      label="Confirm Password"
                      id="outlined-confirmpassword-input"
                      variant="outlined"
                      type="password"
                      fullWidth
                      placeholder="Confirm your Password"
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 9, marginLeft: 55, border: 2, boxShadow: 3 }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ border: 2, boxShadow: 3 }}
                >
                  Save Profile
                </Button>
              </Paper>
            </Box>
          </Box>
        </Container>
      </React.Fragment>
    </>
  );
}
