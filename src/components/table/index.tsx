import { faker } from "@faker-js/faker";
import DoneIcon from "@mui/icons-material/Done";
import { Avatar, Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import { green, red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import BasicModal from "../../components/modal";
import palette from "../../theme/palette";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AvailableIcon from "@mui/icons-material/CheckCircle";
import UnavailableIcon from "@mui/icons-material/Cancel";
import useResponsive from "../../hooks/useResponsive";

const specializations = [
	"Allergy and immunology",
	"Anesthesiology",
	"Dermatology",
	"Diagnostic radiology",
	"Emergency medicine",
	"Family medicine",
	"Internal medicine",
	"Medical genetics",
	"Neurology",
	"Nuclear medicine",
	"Obstetrics and gynecology",
	"Ophthalmology",
	"Pathology",
	"Pediatrics",
	"Physical medicine and rehabilitation",
	"Preventive medicine",
	"Psychiatry",
	"Radiation oncology",
	"Surgery",
	"Urology",
];

const equipment = [
	"Exam tables",
	"Defibrillator",
	"Emergency equipment",
	"Cleaning products and sterilization tools",
	"Gloves and masks",
	"Blood pressure monitors",
	"Thermometers",
	"Containers for toxic materials and needles",
	"Stepstools",
	"Stethoscopes",
	"Lighting equipment",
	"Scales",
	"Clocks",
	"Eye charts",
	"ECG equipment",
];

function createData(): {
	clinicName: string;
	address: string;
	email: string;
	rush: number;
	equipment: string[];
	specialists: {
		name: string;
		specialization: string;
		available: boolean;
	}[];
} {
	return {
		clinicName: faker.company.companyName() + " Clinic",
		address: faker.address.streetAddress(),
		email: faker.internet.email(),
		rush: faker.datatype.number({ max: 10 }),
		equipment: faker.helpers.arrayElements(equipment),
		specialists: Array.from(
			{ length: faker.datatype.number({ max: 5 }) },
			() => ({
				name: faker.name.fullName(),
				specialization: faker.helpers.arrayElement(specializations),
				available: faker.datatype.boolean(),
			})
		),
	};
}

const StyledBar = styled("div")({
	width: "6px",
	height: "1em",
	border: "1px solid " + palette.primary.main,
	marginRight: "2px",
	marginLeft: "2px",
});

function Row(props: { row: ReturnType<typeof createData> }) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const mdUp = useResponsive("up", "md");
	const smUp = useResponsive("up", "sm");

	return (
		<React.Fragment>
			<TableRow
				sx={{
					"& > *": { borderBottom: "unset" },
				}}
			>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.clinicName}
				</TableCell>
				{smUp && <TableCell>{row.address}</TableCell>}
				{mdUp && <TableCell>{row.email}</TableCell>}
				<TableCell align="center">
					<Rating
						value={row.rush}
						max={10}
						readOnly
						icon={
							<StyledBar
								sx={{
									backgroundColor: palette.primary.main,
								}}
							/>
						}
						emptyIcon={<StyledBar />}
					/>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							{!smUp && (
								<Stack direction="row" sx={{ marginY: 4 }}>
									<Typography
										variant="subtitle2"
										sx={{ marginRight: 2 }}
									>
										Address:
									</Typography>
									<Typography variant="body2">
										{row.address}
									</Typography>
								</Stack>
							)}
							{!mdUp && (
								<Stack direction="row" sx={{ marginY: 4 }}>
									<Typography
										variant="subtitle2"
										sx={{ marginRight: 2 }}
									>
										Email:
									</Typography>
									<Typography variant="body2">
										{row.email}
									</Typography>
								</Stack>
							)}
							<Stack
								direction="row"
								sx={{ marginY: 4, alignItems: "center" }}
							>
								<Typography
									variant="subtitle2"
									sx={{ marginRight: 2 }}
								>
									Equipment Available:
								</Typography>
								<Stack
									direction="row"
									flexWrap="wrap"
									rowGap={1}
									spacing={1}
								>
									{row.equipment.length > 0 ? (
										row.equipment.map(
											(equipment, index) => (
												<Chip
													key={index}
													size={
														!smUp
															? "small"
															: undefined
													}
													label={equipment}
												/>
											)
										)
									) : (
										<Typography>
											No equipment data available
										</Typography>
									)}
								</Stack>
							</Stack>
							<Box sx={{ width: "100%" }}>
								{row.specialists.length > 0 && (
									<Table
										size="small"
										aria-label="specialists"
									>
										<TableHead>
											<TableRow>
												<TableCell component="th">
													<Typography variant="body2">
														Name
													</Typography>
												</TableCell>
												<TableCell component="th">
													<Typography variant="body2">
														Specialization
													</Typography>
												</TableCell>
												<TableCell
													component="th"
													align="center"
												>
													<Typography variant="body2">
														Availability
													</Typography>
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{row.specialists.map(
												(specialist, index) => (
													<TableRow key={index}>
														<TableCell>
															<Typography variant="body2">
																{
																	specialist.name
																}
															</Typography>
														</TableCell>
														<TableCell>
															<Typography variant="body2">
																{
																	specialist.specialization
																}
															</Typography>
														</TableCell>
														<TableCell align="center">
															{specialist.available ? (
																<AvailableIcon color="success" />
															) : (
																<UnavailableIcon color="error" />
															)}
														</TableCell>
													</TableRow>
												)
											)}
										</TableBody>
									</Table>
								)}
							</Box>
							<div id="content" style={{ marginTop: "20px" }}>
								<BasicModal />
							</div>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

const rows = Array.from(
	{ length: faker.datatype.number({ max: 15, min: 1 }) },
	createData
);

export default function CollapsibleTable() {
	const mdUp = useResponsive("up", "md");
	const smUp = useResponsive("up", "sm");
	return (
		<TableContainer component={Paper}>
			{rows.length > 0 ? (
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Clinic Name</TableCell>
							{smUp && <TableCell>Address</TableCell>}
							{mdUp && <TableCell>Email</TableCell>}
							<TableCell align="center">Rush</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<Row key={row.clinicName} row={row} />
						))}
					</TableBody>
				</Table>
			) : (
				<Typography>No clinics currently available</Typography>
			)}
		</TableContainer>
	);
}
