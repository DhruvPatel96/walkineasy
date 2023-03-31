import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {Dialog, DialogActions, DialogContent, DialogTitle, Link, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {NavLink as RouterLink} from "react-router-dom";
import {useAppSelector} from "../../store";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

type ETA = 5 | 10 | 15;

type Props = {
	details: { name: string; email: string };
	onRequestBooking: (email: string, duration: ETA) => void;
};

export default function BasicModal({ onRequestBooking,details }: Props) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { user } = useAppSelector((state) => state.auth);
	const [Time, setTime] = React.useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setTime(event.target.value as string);
	};

	return (
		<div>
			<Box >
				<Button onClick={handleOpen} endIcon={<SendIcon />}>Request Booking</Button>
				<Dialog open={open}>
					<DialogTitle>Request booking</DialogTitle>
					<DialogContent>
						<div style={{minWidth:500}}>
							Name: {" "}
							{user?.name || "Nameless"}
						</div>
						<div>
							Clinic: {" "}
							{details.name || "Nameless"}
						</div>
						<div>
							<Typography>
								To ensure that everything runs smoothly, could you please let us know how much time you anticipate needing before arriving at the clinic?
							</Typography>
						</div>
						<div style={{marginTop:20}}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Time</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={Time}
									label="Time"
									onChange={handleChange}
								>
									<MenuItem value={5}>5 Minutes</MenuItem>
									<MenuItem value={10}>10 Minutes</MenuItem>
									<MenuItem value={15}>15 Minutes</MenuItem>
								</Select>
							</FormControl>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={() => handleClose()} >Request</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</div>
	);
}
