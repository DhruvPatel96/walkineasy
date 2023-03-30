// ----------------------------------------------------------------------

import Iconify from "../../../components/iconify/Iconify";
import palette from "../../../theme/palette";

const icon = (name: string) => (
	<Iconify icon={name} color={palette.primary.main} />
);

const navConfig = [
	{
		title: "search clinics",
		path: "search",
		icon: icon("fa6-solid:magnifying-glass"),
	},
	{
		title: "my profile",
		path: "profile",
		icon: icon("fa6-solid:user"),
	},
];

export default navConfig;
