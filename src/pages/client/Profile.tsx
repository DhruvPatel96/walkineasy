import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, Tab, Tabs, TextField } from "@mui/material";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function ClientProfile() {
  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    const db = getFirestore();
    const ref = doc(db, "Client Record", "harmanjotsuri@gmail.com");
    const docSnap = await getDoc(ref);
    let fullName = document.getElementById("fullname") as HTMLInputElement;
    let email = document.getElementById("email") as HTMLInputElement;
    let contact = document.getElementById("contact") as HTMLInputElement;
    let city = document.getElementById("city") as HTMLInputElement;
    let street = document.getElementById("street") as HTMLInputElement;
    let province = document.getElementById("province") as HTMLInputElement;
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
      city.value = docSnap.data().city;
      street.value = docSnap.data().street;
      province.value = docSnap.data().province;
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
    let city = document.getElementById("city") as HTMLInputElement;
    let street = document.getElementById("street") as HTMLInputElement;
    let province = document.getElementById("province") as HTMLInputElement;
    let address = document.getElementById("address") as HTMLInputElement;
    let password = document.getElementById("password") as HTMLInputElement;
    let confirmpass = document.getElementById(
      "confirmpass"
    ) as HTMLInputElement;
    const docRef = await setDoc(ref, {
      Name: fullName.value,
      email: email.value,
      phone: contact.value,
      street: street.value,
      city: city.value,
      province: province.value,
      confirmPass: confirmpass.value,
    })
      .then(() => {
        alert("data updated successfully");
      })
      .catch((error: Error) => {
        alert("Unsuccessful operation, error:" + error);
      });
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Box
            sx={{
              display: "flex",
              // borderRadius: 2,
              marginTop: 5,
              boxShadow: 12,
              bgcolor: "#FFFFFF",
              "& > :not(style)": {
                width: "85vw",
                height: "75vh",
              },
            }}
          >
            <Paper elevation={3}>
              <TextField
                id="standard-read-only-input"
                defaultValue="Walk in Easy : Client Profile "
                InputProps={{
                  readOnly: true,
                  style: {
                    paddingLeft: "20px",
                    fontWeight: "bold",
                    fontSize: "25px",
                    color: "#0089ED",
                  },
                }}
                // margin="dense"
                fullWidth
                size="medium"
                variant="standard"
              />
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="About" {...a11yProps(0)} />
                    <Tab label="Address" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2}
                    padding={4}
                    marginTop={1}
                  >
                    <Grid item xs={2} sm={4}>
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
                    <Grid item xs={2} sm={4}>
                      <label>Email Id *</label>
                      <TextField
                        disabled
                        id="email"
                        type="email"
                        variant="standard"
                        fullWidth
                        placeholder="Enter your Email"
                      />
                    </Grid>
                    <Grid item xs={2} sm={4}>
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
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2}
                    padding={4}
                    marginTop={1}
                  >
                    <Grid item xs={12} sm={4}>
                      <label>Street*</label>
                      <TextField
                        required
                        id="street"
                        variant="standard"
                        fullWidth
                        placeholder="Enter your Street"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <label>City *</label>
                      <TextField
                        required
                        id="city"
                        variant="standard"
                        fullWidth
                        placeholder="Enter your City"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <label>Province *</label>
                      <TextField
                        required
                        id="province"
                        variant="standard"
                        fullWidth
                        placeholder="Enter your Province"
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
              </Box>

              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 9, marginLeft: 55, border: 1, boxShadow: 3 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={updateDoc_Client}
                sx={{ border: 1, boxShadow: 3 }}
              >
                Save Profile
              </Button>
              <br></br>
            </Paper>
          </Box>
        </Container>
      </React.Fragment>
    </>
  );
}
export default ClientProfile;
