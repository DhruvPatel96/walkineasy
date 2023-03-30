import PropTypes from "prop-types";
// @mui
import {
	AppBar,
	Box,
	Button,
	ButtonProps,
	IconButton,
	Link,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
// utils
// components
import Iconify from "../../../components/iconify";
import Logo from "../../../components/logo";
import { useAppDispatch } from "../../../store";
import { logout } from "../../../slices/authSlice";
import useResponsive from "../../../hooks/useResponsive";
// ----------------------------------------------------------------------
const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
	boxShadow: "none",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	minHeight: HEADER_MOBILE,
	[theme.breakpoints.up("lg")]: {
		minHeight: HEADER_DESKTOP,
		padding: theme.spacing(0, 5),
	},
}));

// ----------------------------------------------------------------------

Header.propTypes = {
	onOpenNav: PropTypes.func,
};

const WhiteButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: theme.palette.primary.main,
	backgroundColor: blue[50],
	"&:hover": {
		backgroundColor: blue[100],
	},
}));

export default function Header({ onOpenNav }: { onOpenNav: () => void }) {
	const isDesktop = useResponsive("up", "lg");
	const dispatch = useAppDispatch();
	return (
		<StyledRoot>
			<StyledToolbar>
				<IconButton
					onClick={onOpenNav}
					sx={{
						mr: 1,
						color: "text.primary",
						display: { lg: "none" },
					}}
				>
					<Iconify icon="eva:menu-2-fill" sx={{ color: "white" }} />
				</IconButton>
				<Logo />

				<Box sx={{ flexGrow: 1 }} />
				<Typography
					sx={{ mx: 2, display: isDesktop ? "flex" : "none" }}
				>
					Logged in as {"  "}
					<Link sx={{ ml: 1 }} color="#fff" href="/client/profile">
						Dave
					</Link>
				</Typography>
				<WhiteButton sx={{ mx: 2 }} onClick={() => dispatch(logout())}>
					Logout
				</WhiteButton>
			</StyledToolbar>
		</StyledRoot>
	);
}
