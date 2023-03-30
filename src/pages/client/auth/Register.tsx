import { Container, Link, styled, Typography } from "@mui/material";
import { db } from "../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import ClientRegisterForm from "../../../forms/ClientRegisterForm";
import useToast from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";

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
						Name: name,
						email,
						phone,
						street,
						city,
						province,
					})
						.then(() => {
							console.log("data added successfully");
							showToast("An OTP has been sent to ...", "success");
							navigate("/client/auth/firebaseAuth");
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
				showToast(error.message, "error");
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
					<Link href="/clinic/auth/register" variant="subtitle2">
						Register as a clinic
					</Link>
				</Typography>
				<ClientRegisterForm loginPath="login" onRegister={onRegister} />
			</StyledContent>
			{Toast}
		</Container>
	);
};

export default ClientRegister;
