import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// @mui
import {
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import palette from "../../theme/palette";
//

// ----------------------------------------------------------------------

NavSection.propTypes = {
	data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }: { data: Item[] }) {
	return (
		<Box {...other}>
			<List disablePadding sx={{ p: 1 }}>
				{data.map((item) => (
					<NavItem key={item.title} item={item} />
				))}
			</List>
		</Box>
	);
}

// ----------------------------------------------------------------------

type Item = {
	title: string;
	path: string;
	icon?: JSX.Element;
	info?: JSX.Element;
};
type Props = {
	item: Item;
};

const NavItem = ({ item }: Props) => {
	const { title, path, icon, info } = item;
	const navigate = useNavigate();
	return (
		<ListItemButton
			sx={{
				"&.active": {
					color: "text.primary",
					bgcolor: "action.selected",
					fontWeight: "fontWeightBold",
				},
				height: 48,
				position: "relative",
				textTransform: "capitalize",
				color: palette.text.secondary,
			}}
			onClick={() => navigate(path)}
		>
			<ListItemIcon>{icon && icon}</ListItemIcon>

			<ListItemText
				disableTypography
				style={{ textTransform: "capitalize" }}
				primary={title}
			/>

			{info && info}
		</ListItemButton>
	);
};
