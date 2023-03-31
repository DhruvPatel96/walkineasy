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
import { useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useNavigate } from "react-router";
import {useAppSelector} from "../../store";

export default function ClinicProfile() {
	useEffect(() => {
		fetchClinicData();
	}, []);
	const { user } = useAppSelector((state) => state.auth);

	const fetchClinicData = async () => {
		const ref = doc(db, "Clinic Record", user?.email ?? "");
		const docSnap = await getDoc(ref);

		let fullName = document.getElementById(
			"clinicName"
		) as HTMLInputElement;
		let email = document.getElementById("clinicEmail") as HTMLInputElement;
		let contact = document.getElementById(
			"clinicContact"
		) as HTMLInputElement;
		let street = document.getElementById(
			"clinicStreet"
		) as HTMLInputElement;
		let city = document.getElementById("clinicCity") as HTMLInputElement;
		let province = document.getElementById(
			"clinicProvince"
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
			fullName.value = docSnap.data().name;
			email.value = docSnap.data().email;
			contact.value = docSnap.data().phone;
			street.value = docSnap.data().street;
			city.value = docSnap.data().city;
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
	async function updateDoc_Clinic() {
		let email = document.getElementById("clinicEmail") as HTMLInputElement;

		const ref = doc(db, "Clinic Record", email.value);
		let fullName = document.getElementById(
			"clinicName"
		) as HTMLInputElement;
		let contact = document.getElementById(
			"clinicContact"
		) as HTMLInputElement;
		let street = document.getElementById(
			"clinicStreet"
		) as HTMLInputElement;
		let city = document.getElementById("clinicCity") as HTMLInputElement;
		let province = document.getElementById(
			"clinicProvince"
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
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/clinic/auth");
	};
	return (
		<React.Fragment>
			<CssBaseline />
			<Container fixed>
				<Box
					sx={{
						display: "flex",
						// borderRadius: 2,
						marginTop: 1,
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
							defaultValue="Walk in Easy : Clinic Profile"
							InputProps={{
								readOnly: true,
								style: {
									paddingLeft: "20px",
									fontWeight: "bold",
									fontSize: "25px",
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
							//   marginTop={2}
						>
							<Grid item xs={12} sm={4}>
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
							<Grid item xs={12} sm={4}>
								<label>Clinic Email Id *</label>
								<TextField
									disabled
									id="clinicEmail"
									type="email"
									variant="standard"
									fullWidth
									placeholder="Enter your Email"
								/>
							</Grid>

							<Grid item xs={12} sm={4}>
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
							<Grid item xs={12} sm={12}>
								<p>Address</p>
							</Grid>
							<Grid item xs={12} sm={4}>
								<label>Street *</label>
								<TextField
									required
									id="clinicStreet"
									variant="standard"
									fullWidth
									placeholder="Enter your Street"
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<label>City *</label>
								<TextField
									required
									id="clinicCity"
									variant="standard"
									fullWidth
									placeholder="Enter your City"
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<label>Province *</label>
								<TextField
									required
									id="clinicProvince"
									variant="standard"
									fullWidth
									placeholder="Enter your Province"
								/>
							</Grid>
						</Grid>
						<br></br>
						<Button
							variant="contained"
							color="primary"
							onClick={handleClick}
							sx={{
								mr: 9,
								marginLeft: 45,
								border: 2,
								boxShadow: 3,
							}}
						>
							Cancel
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
					{/* </Box> */}
				</Box>
			</Container>
		</React.Fragment>
	);
}
