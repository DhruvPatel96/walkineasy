import { styled } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Nav from "./nav";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const Main = styled("div")(({ theme }) => ({
	flexGrow: 1,
	overflow: "auto",
	minHeight: "100%",
	paddingTop: APP_BAR_MOBILE + 24,
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("lg")]: {
		paddingTop: APP_BAR_DESKTOP + 24,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
}));

const ClientHeader = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Header onOpenNav={() => setOpen(true)} />
			<Nav openNav={open} onCloseNav={() => setOpen(false)} />
			<Main>
				<Outlet />
			</Main>
		</>
	);
};

export default ClientHeader;
