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
import { useAppDispatch, useAppSelector } from "../../../store";
import { logout } from "../../../slices/authSlice";
import useResponsive from "../../../hooks/useResponsive";
import { useNavigate } from "react-router";
import { NavLink as RouterLink } from "react-router-dom";
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
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.auth);
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
				<Logo linkPath="/client/search" />

				<Box sx={{ flexGrow: 1 }} />
				<Stack sx={{ mx: 2, display: isDesktop ? "flex" : "none" }}>
					<Typography>
						Logged in as{" "}
						<Link
							sx={{ ml: 0.5 }}
							color="#fff"
							to="/client/profile"
							component={RouterLink}
						>
							{user?.name || "Nameless"}
						</Link>
					</Typography>
					<WhiteButton
						size="small"
						onClick={() => navigate("/client/profile")}
					>
						Edit Your Profile
					</WhiteButton>
				</Stack>
				<WhiteButton sx={{ mx: 2 }} onClick={() => dispatch(logout())}>
					Logout
				</WhiteButton>
			</StyledToolbar>
		</StyledRoot>
	);
}
