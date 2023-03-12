import { forwardRef } from "react";
// icons
import { Icon, IconifyIcon } from "@iconify/react";
// @mui
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const Iconify = forwardRef(
	(
		{
			icon,
			width = 20,
			sx,
			...other
		}: {
			icon: string | IconifyIcon;
			width: number | string;
			sx: Object;
			[key: string]: Object;
		},
		ref
	) => (
		<Box
			ref={ref}
			component={Icon}
			icon={icon}
			sx={{ width, height: width, ...sx }}
			{...other}
		/>
	)
);

export default Iconify;
