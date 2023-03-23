import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
// components
import Logo from "../../components/logo";

// ----------------------------------------------------------------------

const StyledHeader = styled("header")(({ theme }) => ({
	top: 0,
	left: 0,
	lineHeight: 0,
	width: "100%",
	position: "absolute",
	zIndex: 999,
	padding: theme.spacing(2, 2, 0),
	[theme.breakpoints.up("lg")]: {
		padding: theme.spacing(5, 5, 0),
	},
}));

// ----------------------------------------------------------------------

export default function SimpleLayout() {
	return (
		<>
			<StyledHeader>
				<Logo />
			</StyledHeader>

			<Outlet />
		</>
	);
}
