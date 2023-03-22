import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import {
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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

const StyledNavItem = styled((props) => (
	<ListItemButton disableGutters {...props} />
))(({ theme }) => ({
	...theme.typography.body2,
	height: 48,
	position: "relative",
	textTransform: "capitalize",
	color: theme.palette.text.secondary,
	borderRadius: theme.shape.borderRadius,
})) as typeof ListItemButton;

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
	return (
		<StyledNavItem
			component={RouterLink}
			to={path}
			sx={{
				"&.active": {
					color: "text.primary",
					bgcolor: "action.selected",
					fontWeight: "fontWeightBold",
				},
				px: 2,
			}}
		>
			<>
				<ListItemIcon>{icon && icon}</ListItemIcon>

				<ListItemText
					disableTypography
					style={{ textTransform: "capitalize" }}
					primary={title}
				/>

				{info && info}
			</>
		</StyledNavItem>
	);
};
