import { Container, Link, styled, Typography } from "@mui/material";
import { db } from "../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import ClientRegisterForm from "../../../forms/ClientRegisterForm";
import useToast from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { NavLink as RouterLink } from "react-router-dom";
import {  sendSignInLinkToEmail } from "firebase/auth";
import firebase from "firebase/compat/app";

const StyledContent = styled("div")(({ theme }) => ({
	maxWidth: 480,
	margin: "auto",
	minHeight: "100vh",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	padding: theme.spacing(12, 0),
}));

const ClientRegister = () => {
	const { showToast, Toast } = useToast();
	const navigate = useNavigate();
	const auth = getAuth();
	// send email to verify account
	const actionCodeSettings = {
		// URL you want to redirect back to. The domain (www.example.com) for this
		// URL must be in the authorized domains list in the Firebase Console.
		url: 'http://localhost:3000/clinic/auth/emailVerified',
		//url: 'https://www.example.com/finishSignUp?cartId=1234',
		// This must be true.
		handleCodeInApp: true
	};
	const onRegister = async ({
		name,
		email,
		phone,
		street,
		city,
		province,
		password,
	}: {
		name: string;
		email: string;
		phone: string;
		street: string;
		city: string;
		province: string;
		password: string;
	}) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				const ref = doc(db, "Client Record", email);
				const docSnap = await getDoc(ref);
				if (docSnap.exists()) {
					showToast("Account Already Exists!");
				} else {
					await setDoc(ref, {
						name,
						email,
						phone,
						street,
						city,
						province,
					})
						.then(() => {
							console.log("data added successfully");
							sendSignInLinkToEmail(auth, email, actionCodeSettings)
								.then(() => {
									alert("email sent")
								})
								.catch((error) => {
									alert(error.message)
									const errorCode = error.code;
									const errorMessage = error.message;
									// ...
								});
							showToast("An OTP has been sent to ...", "success");
							//navigate("/client/auth/firebaseAuth");
							navigate("/client/");

						})
						.catch((error: Error) => {
							console.log(
								"Unsuccessful data operation, error:" + error
							);
							showToast("Something went wrong", "error");
						});
				}
			})
			.catch((error) => {
				showToast("eRROR " +error.message, "error");
			});





	};
	return (
		<Container maxWidth="sm">
			<StyledContent>
				<Typography variant="h4" gutterBottom>
					Register as a Client
				</Typography>

				<Typography variant="body2" sx={{ mb: 5 }}>
					Not a client?{" "}
					<Link
						to="/clinic/auth/register"
						component={RouterLink}
						variant="subtitle2"
					>
						Register as a clinic
					</Link>
				</Typography>
				<ClientRegisterForm
					loginPath="/client/auth/login"
					onRegister={onRegister}
				/>
			</StyledContent>
			{Toast}
		</Container>
	);
};

export default ClientRegister;
