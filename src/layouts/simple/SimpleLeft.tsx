import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import palette from "../../theme/palette";
import useResponsive from "../../hooks/useResponsive";
import Logo from "../../components/logo";

// ----------------------------------------------------------------------

const StyledBG = styled("div")(({ theme }) => ({
	top: 0,
	left: 0,
	lineHeight: 0,
	width: "50%",
	height: "100%",
	position: "absolute",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	background: palette.primary.main,
}));

const OtherBG = styled("div")(({ theme }) => ({
	top: 0,
	right: 0,
	lineHeight: 0,
	width: "50%",
	height: "100%",
	position: "absolute",
	background: palette.background.default,
	[theme.breakpoints.down("md")]: {
		width: "100%",
	},
}));

const Container = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "start",
}));

const Title = styled("h1")(({ theme }) => ({
	color: "white",
	fontSize: "80px",
}));

const SubTitle = styled("h1")(({ theme }) => ({
	color: "white",
}));

const LogoContainer = styled("div")(({ theme }) => ({
	top: 0,
	left: 0,
	position: "absolute",
	padding: theme.spacing(2, 2, 0),
	[theme.breakpoints.up("lg")]: {
		padding: theme.spacing(5, 5, 0),
	},
}));

// ----------------------------------------------------------------------

export default function SimpleRight() {
	const mdUp = useResponsive("up", "md");
	return (
		<>
			{mdUp && (
				<StyledBG>
					<Container>
						<Title className="untouchable">Walk in Easy</Title>
						<SubTitle className="untouchable">
							"Know before you go..."
						</SubTitle>
					</Container>
				</StyledBG>
			)}
			<OtherBG>
				<Outlet />
			</OtherBG>
			<LogoContainer>
				<Logo />
			</LogoContainer>
		</>
	);
}
