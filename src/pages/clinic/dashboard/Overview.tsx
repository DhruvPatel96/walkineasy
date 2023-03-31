import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import MailIcon from "@mui/icons-material/Mail";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import {
	Badge,
	Card,
	CardContent,
	Container,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	InputLabel,
	NativeSelect,
	Paper,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
} from "@mui/material";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
interface CardProps {
	title: string;
	content: string;
	tableData?: Data[];
}

interface Data {
	name: string;
	designation: string;
	id: string;
	availability: boolean;
}

function createData(
	name: string,
	designation: string,
	id: string,
	availability: boolean
): Data {
	return { name, designation, id, availability };
}

const CardComponent: React.FC<
	CardProps & {
		setRows: React.Dispatch<
			React.SetStateAction<ReturnType<typeof createData>[]>
		>;
	}
> = ({ title, content, tableData, setRows }) => {
	async function updateDocAvailability(row: Data) {
		const ref = doc(db, "Doctor Record", "windsor Region");
		const subcollectionRef = collection(ref, "windsor Region doctors");
		const docRef = doc(subcollectionRef, row.id);
		await setDoc(docRef, {
			Name: row.name,
			designation: row.designation,
			Id: row.id,
			availability: !row.availability,
		})
			.then(() => {
				//alert("data updated successfully")
			})
			.catch((error: Error) => {
				alert("Unsuccessful operation, error:" + error);
			});
		setRows((rows) => {
			rows.forEach((eachRow) => {
				if (eachRow.id === row.id) {
					eachRow.availability = !row.availability;
				}
			});
			return rows;
		});
	}

	const label = { inputProps: { "aria-label": "Switch demo" } };

	return (
		<Card>
			<CardContent>
				<Typography variant="h5" component="h2">
					{title}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{content}
				</Typography>
				{tableData && (
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Doctor Name</TableCell>
									<TableCell>Specialization</TableCell>
									<TableCell>Availability status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{tableData.map((row, index) => (
									<TableRow key={row.name}>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell component="th" scope="row">
											{row.designation}
										</TableCell>
										<TableCell sx={{ width: "20%" }}>
											<FormGroup>
												<FormControlLabel
													control={
														<Switch
															checked={
																row.availability
															}
															onChange={() =>
																updateDocAvailability(
																	row
																)
															}
														/>
													}
													label={
														row.availability
															? "Available"
															: "Unavailable"
													}
												/>
											</FormGroup>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</CardContent>
		</Card>
	);
};

const NewCardComponent: React.FC<CardProps> = ({ title, content }) => {
	const [occupancy, setOccupancy] = React.useState("1");
	const [icon, setIcon] = React.useState(
		<Tooltip title="Can take more patients" placement="top">
			<GroupAddOutlinedIcon sx={{ fontSize: 40 }} />
		</Tooltip>
	);

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		const value = event.currentTarget.value as string;
		setOccupancy(value);
		if (value === "1") {
			setIcon(
				<Tooltip title="Can take more patients" placement="top">
					<GroupAddOutlinedIcon sx={{ fontSize: 40 }} />
				</Tooltip>
			);
		} else if (value === "2") {
			setIcon(
				<Tooltip title="Can take few patients" placement="top">
					<PersonAddOutlinedIcon sx={{ fontSize: 40 }} />
				</Tooltip>
			);
		} else {
			setIcon(
				<Tooltip title="Cannot take any more patients" placement="top">
					<PersonOffOutlinedIcon sx={{ fontSize: 40 }} />
				</Tooltip>
			);
		}
	};
	return (
		<Card>
			<CardContent>
				<Typography variant="h5" component="h2">
					{title}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{content}
				</Typography>
				<Grid container spacing={10}>
					<Grid item xs={12} sm={8}>
						<FormControl fullWidth>
							<InputLabel
								variant="standard"
								htmlFor="uncontrolled-native"
							>
								Occupancy
							</InputLabel>
							<NativeSelect
								value={occupancy}
								onChange={handleChange}
								inputProps={{
									name: "occupancy",
									id: "occupancy",
								}}
							>
								<option value={"1"}>1</option>
								<option value={"2"}>2</option>
								<option value={"3"}>3</option>
								<option value={"4"}>4</option>
								<option value={"5"}>5</option>
								<option value={"6"}>6</option>
								<option value={"7"}>7</option>
								<option value={"8"}>8</option>
								<option value={"9"}>9</option>
								<option value={"10"}>10</option>
							</NativeSelect>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={4}>
						{icon}
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

const CardComponent2: React.FC<CardProps> = ({ title, content }) => {
	return (
		<Card>
			<CardContent>
				<Typography variant="h5" component="h2">
					{title}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{content}
				</Typography>
				<Badge badgeContent={4} color="success">
					<MailIcon sx={{ fontSize: 47 }} color="action" />
				</Badge>
			</CardContent>
		</Card>
	);
};

const Overview = () => {
	let count = 1;
	useEffect(() => {
		async function fetch() {
			await fetchDoctors();
		}
		while (count == 1) {
			fetch();
			count++;
		}
	}, []);
	const [rows, setRows] = React.useState<Data[]>([]);

	const fetchDoctors = async () => {
		const doctor_rows = [];
		const subcollectionRef = collection(
			db,
			"Doctor Record",
			"windsor Region",
			"windsor Region doctors"
		);
		const querySnapshot = await getDocs(subcollectionRef);
		const doctors = querySnapshot.docs.map((doc) => ({
			Name: doc.data().Name,
			designation: doc.data().designation,
			id: doc.data().Id,
			availability: doc.data().availability,
		}));
		console.log(doctors);
		let i = 0;
		while (i < doctors.length) {
			console.log(doctors[i].Name + " " + doctors[i].designation);
			doctor_rows.push(
				createData(
					doctors[i].Name,
					doctors[i].designation,
					doctors[i].id,
					doctors[i].availability
				)
			);
			i++;
		}
		setRows(doctor_rows);
		//alert(rows[0].name+" "+rows[0].designation)
	};

	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<CardComponent2 title="Pending Requests" content="" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<NewCardComponent
						title="Current Occupancy Indicator"
						content=""
					/>
				</Grid>
				<Grid item xs={12}>
					<CardComponent
						title="Update Doctor Availability"
						content=""
						tableData={rows}
						setRows={setRows}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Overview;
