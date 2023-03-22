import { Container, Link, styled, Typography } from "@mui/material";
import ClinicRegisterForm from "../../../forms/ClinicRegisterForm";

const StyledContent = styled("div")(({ theme }) => ({
	maxWidth: 480,
	margin: "auto",
	minHeight: "100vh",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	padding: theme.spacing(12, 0),
}));

const ClinicRegister = () => {
	return (
		<Container maxWidth="sm">
			<StyledContent>
				<Typography variant="h4" gutterBottom>
					Register as a Clinic
				</Typography>

				<Typography variant="body2" sx={{ mb: 5 }}>
					Not a clinic?{" "}
					<Link href="/client/auth/register" variant="subtitle2">
						Register as a client
					</Link>
				</Typography>
				<ClinicRegisterForm />
			</StyledContent>
		</Container>
	);
};

export default ClinicRegister;
