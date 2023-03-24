import { Container, Link, styled, Typography } from "@mui/material";
import { LoginForm } from "../../../forms/LoginForm";

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

				<LoginForm registerPath="register" forgotPath="forgot" client="No"/>
			</StyledContent>
		</Container>
	);
};

export default ClinicLogin;
