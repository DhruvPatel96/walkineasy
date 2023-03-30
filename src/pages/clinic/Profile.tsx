import { Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import * as React from "react";
import { useEffect } from "react";

export default function ClinicProfile() {
	useEffect(() => {
		fetchClinicData();
	}, []);
	const fetchClinicData = async () => {
		const db = getFirestore();
		const ref = doc(db, "Clinic Record", "ABC@health.ca");
		const docSnap = await getDoc(ref);

		let fullName = document.getElementById(
			"clinicName"
		) as HTMLInputElement;
		let email = document.getElementById("clinicEmail") as HTMLInputElement;
		let contact = document.getElementById(
			"clinicContact"
		) as HTMLInputElement;
		let address = document.getElementById(
			"clinicAddress"
		) as HTMLInputElement;
		let password = document.getElementById(
			"ClinicPass"
		) as HTMLInputElement;
		let confirmpass = document.getElementById(
			"clinicConfirmPass"
		) as HTMLInputElement;

		if (docSnap.exists()) {
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
	async function updateDoc_Clinic() {
		const db = getFirestore();
		let email = document.getElementById("clinicEmail") as HTMLInputElement;

		const ref = doc(db, "Clinic Record", email.value);
		let fullName = document.getElementById(
			"clinicName"
		) as HTMLInputElement;
		let contact = document.getElementById(
			"clinicContact"
		) as HTMLInputElement;
		let address = document.getElementById(
			"clinicAddress"
		) as HTMLInputElement;
		let password = document.getElementById(
			"ClinicPass"
		) as HTMLInputElement;
		let confirmpass = document.getElementById(
			"clinicConfirmPass"
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
								defaultValue="Clinic Profile"
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
									<label>Clinic Email Id *</label>
									<TextField
										required
										id="clinicEmail"
										type="email"
										variant="standard"
										fullWidth
										placeholder="Enter your Email"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<label>Organization *</label>
									<TextField
										id="clinicName"
										required
										autoFocus
										variant="standard"
										placeholder="Enter your Organization"
										fullWidth
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<label>Contact No. *</label>
									<TextField
										required
										id="clinicContact"
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
										id="clinicAddress"
										variant="standard"
										fullWidth
										placeholder="Enter your Address"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<label>Password *</label>
									<TextField
										required
										id="ClinicPass"
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
										id="clinicConfirmPass"
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
								sx={{
									mr: 9,
									marginLeft: 55,
									border: 2,
									boxShadow: 3,
								}}
							>
								Reset
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={updateDoc_Clinic}
								sx={{ border: 2, boxShadow: 3 }}
							>
								Save Profile
							</Button>
						</Paper>
					</Box>
				</Box>
			</Container>
		</React.Fragment>
	);
}
