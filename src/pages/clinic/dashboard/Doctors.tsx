import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import {doc,getDocs,collection, deleteDoc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import useToast from "../../../hooks/useToast";
import {db} from "../../../firebase";

interface Column {
	id: 'name' | 'designation' | 'action';
	label: string;
	minWidth?: number;
	align?: 'center';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'Name', minWidth: 200, align:'center' },
	{ id: 'designation', label: 'Designation', minWidth: 200, align:'center' },
	{ id: 'action', label: 'Action', minWidth: 200, align:'center'},
];

interface Data {
	name: string;
	designation: string;
	action: boolean;
	id: string;
}

function createData(
	name: string,
	designation: string,
	action: boolean,
	id: string
): Data {
	return { name, designation, action, id};
}

function ColumnGroupingTable() {

	const [page, setPage] = React.useState(0);
	const [rows, setRows] = React.useState<Data[]>([]);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const { showToast, Toast } = useToast("right");
	const nameRef = React.useRef<HTMLInputElement>(null);
	const designationRef = React.useRef<HTMLInputElement>(null);
	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const [hiddenRows, setHiddenRows] = useState<number[]>([]);
	const handleHideRow = (index: number) => {
		setHiddenRows([...hiddenRows, index]);
	};
	const tableRef = useRef<HTMLTableElement>(null);
	async function delete_doctor(rowId : string) {
		alert(rowId);

		const ref = collection(db,"Doctor Record");
		const docref = doc(ref,"windsor Region");
		const subcollectionRef = collection(docref, "windsor Region doctors");
		const subdocref = doc(subcollectionRef,
			"45182");
		const docSnap = await getDoc(subdocref);
		if(docSnap.exists()){
			await deleteDoc(subdocref);
		}else{
			alert("doctor record doesn't exists!");
		}

		//handleHideRow(index);

	}
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	function generateUniqueID(): number {
		const usedIDs: Set<number> = new Set();
		while (usedIDs.size < 100000) {
			const id: number = Math.floor(Math.random() * 90000) + 10000;
			if (!usedIDs.has(id)) {
				usedIDs.add(id);
				return id;
			}
		}
		throw new Error("Unable to generate unique ID");
	}

	async function handleClose(nameRef: React.RefObject<HTMLInputElement>, designationRef: React.RefObject<HTMLInputElement>){
		const name = nameRef.current?.value || '';
		const designation = designationRef.current?.value || '';
		const id = generateUniqueID();
		await AddDocument_AutoID(name, designation);

		rows.push(createData(name, designation, true, id.toString()));
		setOpen(false);
	};
	const handleClose_cancel = () => {
		setOpen(false);
	};

	async function AddDocument_AutoID(name:string, designation:string){
		const db = getFirestore();
		const ref = doc(db,"Doctor Record","windsor Region");
		const subcollectionRef = collection(ref, "windsor Region doctors");
		const id = generateUniqueID().toString();
		const docRef = doc(subcollectionRef, id.toString());

		await setDoc(docRef,{
			Name: name,
			designation: designation,
			Id: id
		})
	}
	let count = 1;
	useEffect(() => {
		async function fetchDoctors() {
			await getDoctors();
		}
		while(count==1){
			fetchDoctors();
			count++;
		}

	}, []);

	const getDoctors = async () =>{
		const doctor_rows=[];
		const subcollectionRef = collection(db, "Doctor Record", "windsor Region", "windsor Region doctors");
		const querySnapshot =  await getDocs(subcollectionRef);
		const doctors = querySnapshot.docs.map((doc) => ({
			Name: doc.data().Name,
			designation: doc.data().designation,
			id: doc.data().Id
		}));
		console.log(doctors);
		let i=0;
		while(i<doctors.length){
			console.log(doctors[i].Name +" "+  doctors[i].designation)
			doctor_rows.push(createData(doctors[i].Name, doctors[i].designation, true,doctors[i].id));
			i++;
		}
		setRows(doctor_rows);
		//alert(rows[0].name+" "+rows[0].designation)
	}

	return (
		<Paper sx={{ width: '100%' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table" ref={tableRef}>
					<TableHead>
						<TableRow>
							<TableCell align="center" colSpan={3}>
								Doctor Details
							</TableCell>
						</TableRow>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
							const isHidden = hiddenRows.includes(index);
							if (isHidden)
							{return null;}
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.designation}>
									<TableCell key={columns[0].id} align={columns[0].align}>
										{row[columns[0].id]}
									</TableCell>
									<TableCell key={columns[1].id} align={columns[1].align}>
										{row[columns[1].id]}
									</TableCell>
									<TableCell key={columns[2].id} align={columns[2].align}>
										<Button startIcon={<HighlightOffRoundedIcon/>} color="error" onClick={() => delete_doctor(row.id)}>Delete</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>

				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					paddingBottom: "5vh"
				}}
			>
				<Button variant="contained" onClick={handleClickOpen}>Add Doctor</Button>
			<Dialog open={open}>
				<DialogTitle>Add Doctor</DialogTitle>
				<DialogContent>
					<TextField autoFocus margin="dense" label="Name" id="docName" fullWidth inputRef={nameRef} />
					<TextField margin="dense" label="Designation" id="docDesignation" fullWidth inputRef={designationRef} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose_cancel}>Cancel</Button>
					{/*<Button onClick={getDoctors} variant="contained">Save</Button>*/}
					<Button onClick={() => handleClose(nameRef, designationRef)} variant="contained">Save</Button>
				</DialogActions>
			</Dialog>
			</Box>
		</Paper>
	);
};
export default ColumnGroupingTable;