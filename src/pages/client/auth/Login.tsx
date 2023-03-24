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

const ClientLogin = () => {
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

				<LoginForm registerPath="register" forgotPath="forgot" client="Yes"/>
			</StyledContent>
		</Container>
	);
};

export default ClientLogin;
