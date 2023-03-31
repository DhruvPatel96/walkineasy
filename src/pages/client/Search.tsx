import React, { useState } from "react";
import {
	Box,
	Button,
	ButtonProps,
	Stack,
	styled,
	TextField,
	Typography,
	useTheme,
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
	const theme = useTheme();
	const [searchText, setSearchText] = useState("");
	const [location, setLocation] = useState("");
	const [searchQuery, setSearchQuery] = useState<{
		text: string;
		location: string;
	}>({ text: "", location: "" });
	const onSearchClick = () => {
		setSearchQuery({
			text: searchText.toLowerCase(),
			location: location.toLowerCase(),
		});
	};
	return (
		<Box>
			<Box
				mx={-theme.spacing(2)}
				mt={"-24px"}
				sx={{
					justifyContent: "center",
					background: palette.primary.main,
					display: "flex",
					py: "200px",
				}}
			>
				<Stack spacing={6} sx={{ width: "100%", alignItems: "center" }}>
					<Stack sx={{ alignItems: "center" }}>
						<Typography align="center" color="white" variant="h2">
							Welcome to Walk in Easy!
						</Typography>
						<Typography align="center" color="white" variant="h4">
							Search for Walk in clinics around you!
						</Typography>
					</Stack>
					<Stack
						sx={{ width: { xs: "80%", lg: "40%" } }}
						direction={{ lg: "row" }}
						spacing={{ xs: 4, lg: 2 }}
					>
						<TextField
							sx={{
								width: "100%",
								backgroundColor: "white",
								borderRadius: "5px",
							}}
							onChange={(event) =>
								setSearchText(event.target.value)
							}
							label="Search"
						/>
						<TextField
							sx={{
								backgroundColor: "white",
								borderRadius: "5px",
							}}
							onChange={(event) =>
								setLocation(event.target.value)
							}
							label="Location"
						/>
						<WhiteButton
							variant="contained"
							startIcon={<SearchIcon />}
							size="large"
							onClick={onSearchClick}
							sx={{ px: 5, height: "56px" }}
						>
							Search
						</WhiteButton>
					</Stack>
				</Stack>
			</Box>
			<Box px={theme.spacing(2)} mt={"20px"}>
				<CollapsibleTable searchQuery={searchQuery} />
			</Box>
		</Box>
	);
};

export default Search;
