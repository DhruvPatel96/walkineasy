import { Container, Link, styled, Typography } from "@mui/material";
import ClientRegisterForm from "../../../forms/ClientRegisterForm";

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
				<ClientRegisterForm loginPath="login" />
			</StyledContent>
		</Container>
	);
};

export default ClientRegister;
