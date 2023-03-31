import { Container, Link, styled, Typography } from "@mui/material";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../../forms/LoginForm";
import useToast from "../../../hooks/useToast";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { login, UserObject } from "../../../slices/authSlice";
import { useAppDispatch } from "../../../store";
import { db } from "../../../firebase";
import { NavLink as RouterLink } from "react-router-dom";

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
	const dispatch = useAppDispatch();
	const onLogin = async (email: string, password: string) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const ref = doc(db, "Client Record", email);
				const docSnap = await getDoc(ref);
				if (docSnap.exists()) {
					const userData = docSnap.data() as UserObject;
					dispatch(login({ userType: "client", user: userData }));
					showToast("User verified!");
				} else {
					showToast(
						"This account is registered as a Clinic!",
						"error"
					);
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
					Sign in as a User
				</Typography>

				<Typography variant="body2" sx={{ mb: 5 }}>
					Not a client?{" "}
					<Link
						component={RouterLink}
						to="/clinic/auth/login"
						variant="subtitle2"
					>
						Sign in as a clinic
					</Link>
				</Typography>

				<LoginForm
					registerPath="/client/auth/register"
					forgotPath="/client/auth/forgot"
					onLogin={onLogin}
				/>
			</StyledContent>
			{Toast}
		</Container>
	);
};

export default ClientLogin;
