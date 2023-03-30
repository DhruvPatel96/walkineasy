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
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect } from "react";

function ClientProfile() {
  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    const db = getFirestore();
    const ref = doc(db, "Client Record", "dnair@uwindsor.ca");
    const docSnap = await getDoc(ref);
    let fullName = document.getElementById("fullname") as HTMLInputElement;
    let email = document.getElementById("email") as HTMLInputElement;
    let contact = document.getElementById("contact") as HTMLInputElement;
    let address = document.getElementById("address") as HTMLInputElement;
    let password = document.getElementById("password") as HTMLInputElement;
    let confirmpass = document.getElementById(
      "confirmpass"
    ) as HTMLInputElement;

    if (docSnap.exists() && docSnap != null) {
      console.log(docSnap.data().Name);
      fullName.value = docSnap.data().Name;
      email.value = docSnap.data().email;
      contact.value = docSnap.data().phone;
      address.value =
        docSnap.data().street +
        ", " +
        docSnap.data().city +
        ", " +
        docSnap.data().province;
      password.value = docSnap.data().confirmPass;
      confirmpass.value = docSnap.data().confirmPass;
    }
  };

  async function updateDoc_Client() {
    const db = getFirestore();
    let email = document.getElementById("email") as HTMLInputElement;

    const ref = doc(db, "Client Record", email.value);
    let fullName = document.getElementById("fullname") as HTMLInputElement;
    let contact = document.getElementById("contact") as HTMLInputElement;
    let address = document.getElementById("address") as HTMLInputElement;
    let password = document.getElementById("password") as HTMLInputElement;
    let confirmpass = document.getElementById(
      "confirmpass"
    ) as HTMLInputElement;
    const docRef = await setDoc(ref, {
      Name: fullName.value,
      email: email.value,
      phone: contact.value,
      street: "",
      city: "",
      province: "",
      confirmPass: confirmpass.value,
    })
      .then(() => {
        alert("data updated successfully");
      })
      .catch((error: Error) => {
        alert("Unsuccessful operation, error:" + error);
      });
  }
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
                    <label>Full Name *</label>
                    <TextField
                      id="fullname"
                      required
                      autoFocus
                      variant="standard"
                      placeholder="Enter your Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <label>Email Id *</label>
                    <TextField
                      required
                      id="email"
                      type="email"
                      variant="standard"
                      fullWidth
                      placeholder="Enter your Email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <label>Contact No. *</label>
                    <TextField
                      required
                      id="contact"
                      type="number"
                      placeholder="Enter your Number"
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <label>Address *</label>
                    <TextField
                      required
                      id="address"
                      variant="standard"
                      fullWidth
                      placeholder="Enter your Address"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <label>Password *</label>
                    <TextField
                      required
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      variant="standard"
                      fullWidth
                      placeholder="Enter Password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <label>Confirm Password *</label>
                    <TextField
                      required
                      id="confirmpass"
                      //label="Confirm Password"
                      variant="standard"
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
                  onClick={updateDoc_Client}
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
export default ClientProfile;
