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

const ClientLogin = () => {
	const { showToast, Toast } = useToast();
	const navigate = useNavigate();
	const onLogin = async (email: string, password: string) => {
		const db = getFirestore();
		const ref = doc(db, "Client Record", email);
		const docSnap = await getDoc(ref);
		if (docSnap.exists()) {
			if (password == docSnap.data().confirmPass) {
				navigate("/client/search");
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
					Sign in as a Client
				</Typography>

				<Typography variant="body2" sx={{ mb: 5 }}>
					Not a client?{" "}
					<Link href="/clinic" variant="subtitle2">
						Sign in as a clinic
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

export default ClientLogin;
