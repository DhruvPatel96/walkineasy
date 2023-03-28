import { Container, Link, styled, Typography } from "@mui/material";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../../forms/LoginForm";
import useToast from "../../../hooks/useToast";

const StyledContent = styled("div")(({ theme }) => ({
	maxWidth: 480,
	margin: "auto",
	minHeight: "100vh",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	padding: theme.spacing(12, 0),
}));

const ClinicLogin = () => {
	const { showToast, Toast } = useToast("right");
	const navigate = useNavigate();
	const onLogin = async (email: string, password: string) => {
		const db = getFirestore();
		const ref = doc(db, "Clinic Record", email);
		const docSnap = await getDoc(ref);
		if (docSnap.exists()) {
			if (password !== docSnap.data().confirmPass) {
				navigate("/clinic/dashboard");
			} else {
				showToast("Incorrect Password!", "error");
			}
		} else {
			showToast("No such account exists.", "error");
		}
	};
	return (
		<Container maxWidth="sm">
			<StyledContent>
				<Typography variant="h4" gutterBottom>
					Sign in as a Clinic
				</Typography>

				<Typography variant="body2" sx={{ mb: 5 }}>
					Not a clinic?{" "}
					<Link href="/client" variant="subtitle2">
						Sign in as a client
					</Link>
				</Typography>

				<LoginForm
					registerPath="register"
					forgotPath="forgot"
					onLogin={onLogin}
				/>
			</StyledContent>
			{Toast}
		</Container>
	);
};

export default ClinicLogin;
