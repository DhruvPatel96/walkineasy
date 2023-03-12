import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import palette from "../../theme/palette";
import useResponsive from "../../hooks/useResponsive";

// ----------------------------------------------------------------------

const StyledBG = styled("div")(({ theme }) => ({
	top: 0,
	right: 0,
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
	left: 0,
	lineHeight: 0,
	width: "50%",
	height: "100%",
	position: "absolute",
	background: palette.background.default,
	[theme.breakpoints.down("lg")]: {
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

// ----------------------------------------------------------------------

export default function SimpleRight() {
	const lgUp = useResponsive("up", "lg");
	return (
		<>
			{lgUp && (
				<StyledBG>
					<Container>
						<Title>Walk in Easy</Title>
						<SubTitle>"Know before you go..."</SubTitle>
					</Container>
				</StyledBG>
			)}
			<OtherBG>
				<Outlet />
			</OtherBG>
		</>
	);
}
