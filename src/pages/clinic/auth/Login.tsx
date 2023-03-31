import { Container, Link, styled, Typography } from "@mui/material";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../../forms/LoginForm";
import useToast from "../../../hooks/useToast";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ClinicUserObject, login } from "../../../slices/authSlice";
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

const ClinicLogin = () => {
	const { showToast, Toast } = useToast("right");
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const onLogin = async (email: string, password: string) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				// Signed in
				const ref = doc(db, "Clinic Record", email);
				const docSnap = await getDoc(ref);
				if (docSnap.exists()) {
					const userData = docSnap.data() as ClinicUserObject;
					dispatch(login({ userType: "clinic", user: userData }));
					showToast("User verified!");
				} else {
					showToast(
						"This account is registered as a Client!",
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
					Sign in as a Clinic
				</Typography>

				<Typography variant="body2" sx={{ mb: 5 }}>
					Not a clinic?{" "}
					<Link
						component={RouterLink}
						to="/client/auth/login"
						variant="subtitle2"
					>
						Sign in as a User
					</Link>
				</Typography>

				<LoginForm
					registerPath="/clinic/auth/register"
					forgotPath="/clinic/auth/forgot"
					onLogin={onLogin}
				/>
			</StyledContent>
			{Toast}
		</Container>
	);
};

export default ClinicLogin;
