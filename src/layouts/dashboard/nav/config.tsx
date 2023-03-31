// ----------------------------------------------------------------------

import Iconify from "../../../components/iconify/Iconify";
import palette from "../../../theme/palette";

const icon = (name: string) => (
	<Iconify icon={name} color={palette.primary.main} />
);

const navConfig = [
	{
		title: "overview",
		path: "overview",
		icon: icon("ic:round-dashboard"),
	},
	{
		title: "doctors",
		path: "doctors",
		icon: icon("fa6-solid:user-doctor"),
	},
	// {
	// 	title: "equipments",
	// 	path: "equipments",
	// 	icon: icon("fa6-solid:screwdriver-wrench"),
	// },
	{
		title: "requests",
		path: "requests",
		icon: icon("fa6-solid:arrows-down-to-people"),
	},
	{
		title: "profile",
		path: "profile",
		icon: icon("fa6-solid:id-card"),
	},
];

export default navConfig;
