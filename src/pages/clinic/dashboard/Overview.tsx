import React, {useState} from "react";
import MailIcon from '@mui/icons-material/Mail';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import {
	Container, Grid, Typography, Card, CardContent, Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow, Paper, FormGroup,FormControlLabel, Switch,InputLabel, FormControl,
	SelectChangeEvent,NativeSelect, Badge,Tooltip
} from "@mui/material";
interface CardProps {
	title: string;
	content: string;
	tableData?: { name: string; speciality: string; availability: boolean; }[];
}


const CardComponent: React.FC<CardProps> = ({ title, content, tableData }) => {

	const [doctorAvailabilities, setDoctorAvailabilities] = useState(tableData?.map(row => row.availability) || []);
	const handleDoctorAvailabilityChange = (index: number) => {
		setDoctorAvailabilities(prevState => {
			const newState = [...prevState];
			newState[index] = !newState[index];
			return newState;
		});
	};
	const label = { inputProps: { 'aria-label': 'Switch demo' } };
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
											{row.speciality}
										</TableCell>
										<TableCell sx={{width:"20%"}}>
												<FormGroup>
													<FormControlLabel
														control={<Switch checked={doctorAvailabilities[index]} onChange={() => handleDoctorAvailabilityChange(index)} />}
														label={doctorAvailabilities[index] ? "Available" : "Unavailable"}
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
	const [occupancy, setOccupancy] = React.useState('1');
	const [icon, setIcon] = React.useState(<Tooltip title="Can take more patients" placement="top"><GroupAddOutlinedIcon sx={{ fontSize: 40 }} /></Tooltip>);

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		const value = event.currentTarget.value as string;
		setOccupancy(value);
		if (value === '1') {
			setIcon(<Tooltip title="Can take more patients" placement="top"><GroupAddOutlinedIcon sx={{ fontSize: 40 }} /></Tooltip>);
		} else if (value === '2') {
			setIcon(<Tooltip title="Can take few patients" placement="top"><PersonAddOutlinedIcon sx={{ fontSize: 40 }} /></Tooltip>);
		} else {
			setIcon(<Tooltip title="Cannot take any more patients" placement="top"><PersonOffOutlinedIcon sx={{ fontSize: 40 }} /></Tooltip>);
		}
	};
	return(
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
							<InputLabel variant="standard" htmlFor="uncontrolled-native">
								Occupancy
							</InputLabel>
							<NativeSelect
								value={occupancy}
								onChange={handleChange}
								inputProps={{
									name: 'occupancy',
									id: 'occupancy',
								}}>
								<option value={'1'}>Low</option>
								<option value={'2'}>Moderate</option>
								<option value={'3'}>At Capacity</option>
							</NativeSelect>
						</FormControl>
					</Grid>
						<Grid item xs={12} sm={4} >
							{icon}
						</Grid>
					</Grid>
			</CardContent>
		</Card>

	);
};

const CardComponent2: React.FC<CardProps> = ({ title, content }) => {
	return(
		<Card>
			<CardContent>
				<Typography variant="h5" component="h2">
					{title}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{content}
				</Typography>
				<Badge badgeContent={4} color="success" >
					<MailIcon sx={{ fontSize: 47 }} color="action" />
				</Badge>
			</CardContent>
		</Card>

	);
};

const Overview = () => {
	const tableData = [
		{ name: "Dr. Mark", speciality: "Physician", availability: true },
		{ name: "Dr. Julia", speciality: "Surgeon", availability: false },
		{ name: "Dr. Sarah", speciality: "Dietitian", availability: false },
		{ name: "Dr. Markk", speciality: "Psychologist", availability: true },
		{ name: "Dr. Juliaa", speciality: "Physician", availability: false },
		{ name: "Dr. Sarahh", speciality: "Physician", availability: false },
	];


	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<CardComponent2
						title="Pending Requests"
						content=""
					/>
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
						tableData={tableData}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Overview;
