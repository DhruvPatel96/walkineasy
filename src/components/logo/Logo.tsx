import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Box, Link } from "@mui/material";

// ----------------------------------------------------------------------

const Logo = forwardRef(
	(
		{
			disabledLink = false,
			sx,
			linkPath,
			...other
		}: { disabledLink?: Boolean; sx?: Object; linkPath?: string },
		ref
	) => {
		const logo = (
			<Box
				ref={ref}
				component="div"
				sx={{
					width: 50,
					height: 50,
					display: "inline-flex",
					background: "white",
					borderRadius: "50%",
					...sx,
				}}
				{...other}
			>
				<img src="/assets/images/logo.png" alt="Logo" />
			</Box>
		);

		if (disabledLink) {
			return <>{logo}</>;
		}

		return (
			<Link
				to={linkPath || "/"}
				component={RouterLink}
				sx={{ display: "contents" }}
			>
				{logo}
			</Link>
		);
	}
);

export default Logo;
