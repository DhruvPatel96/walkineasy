import React from "react";
import TextField from "@mui/material/TextField";
import {
	Box,
	Button,
	ButtonProps,
	Stack,
	styled,
	Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CollapsibleTable from "../../components/table";
import palette from "../../theme/palette";
import { blue } from "@mui/material/colors";

const WhiteButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: theme.palette.primary.main,
	backgroundColor: blue[50],
	"&:hover": {
		backgroundColor: blue[100],
	},
}));

const Search = () => {
	return (
		<Box>
			<Box
				sx={{
					justifyContent: "center",
					background: palette.primary.main,
					display: "flex",
					py: "200px",
				}}
			>
				<Stack spacing={6} sx={{ width: "100%", alignItems: "center" }}>
					<Stack sx={{ alignItems: "center" }}>
						<Typography color="white" variant="h2">
							Welcome to Walk in Easy!
						</Typography>
						<Typography color="white" variant="h4">
							Search for walk in clinics around you!
						</Typography>
					</Stack>
					<Stack sx={{ width: "40%" }} direction="row" spacing={2}>
						<TextField
							sx={{
								width: "100%",
								backgroundColor: "white",
							}}
							label="Search"
							variant="filled"
						/>
						<TextField
							sx={{ backgroundColor: "white" }}
							label="Location"
							variant="filled"
						/>
						<WhiteButton
							variant="contained"
							startIcon={<SearchIcon />}
							size="large"
							sx={{ px: 5, height: "56px" }}
						>
							Search
						</WhiteButton>
					</Stack>
				</Stack>
			</Box>
			<div id="content" style={{ marginTop: "20px" }}>
				<CollapsibleTable />
			</div>
		</Box>
	);
};

export default Search;
