import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { ETA, RTDBObject } from "../../../slices/authSlice";
import { get, onValue, ref, set } from "firebase/database";
import { rtdb } from "../../../firebase";
import { useAppSelector } from "../../../store";

interface Column {
	id: "eta" | "email";
	label: string;
	minWidth?: number;
	align?: "center";
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: "email", label: "E-mail", minWidth: 200, align: "center" },
	{ id: "eta", label: "ETA", minWidth: 200, align: "center" },
];

interface Data {
	email: string;
	eta: ETA;
}
export default function ColumnGroupingTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [rows, setRows] = useState<Data[]>([]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const [hiddenRows, setHiddenRows] = useState<number[]>([]);
	useEffect(() => {
		const query = ref(rtdb, user?.id || "");
		return onValue(query, (snapshot) => {
			if (snapshot.val()) {
				const { requests } = snapshot.val() as RTDBObject;
				if (requests) {
					setRows(
						requests.map((request) => ({
							email: request.from,
							eta: request.eta,
						}))
					);
				} else {
					setRows([]);
				}
			}
		});
	}, []);

	const handleHideRow = (index: number) => {
		setHiddenRows([...hiddenRows, index]);
	};
	const { user } = useAppSelector((state) => state.auth);
	const accept = (email: string) => {
		console.log("Accept");
		removeRequest(email);
	};
	const removeRequest = async (email: string) => {
		const query = ref(rtdb, user?.id);
		const liveData = (await get(query)).val() as RTDBObject;
		set(query, {
			...liveData,
			requests: liveData.requests
				? liveData.requests.filter((request) => request.from !== email)
				: [],
		});
	};

	return (
		<Paper sx={{ width: "100%" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell align="center" colSpan={4}>
								Pending Requests
							</TableCell>
						</TableRow>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
							<TableCell
								key={"actions"}
								align={"center"}
								style={{ minWidth: 200 }}
							>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row, index) => {
								const isHidden = hiddenRows.includes(index);
								if (isHidden) {
									return null;
								}
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.email}
									>
										<TableCell
											key={columns[0].id}
											align={columns[0].align}
										>
											{row[columns[0].id]}
										</TableCell>
										<TableCell
											key={columns[1].id}
											align={columns[1].align}
										>
											{row[columns[1].id]} Minutes
										</TableCell>
										<TableCell
											key={"actions"}
											align={"center"}
										>
											<Button
												startIcon={
													<CheckCircleOutlineRoundedIcon />
												}
												color="success"
												onClick={() =>
													accept(row.email)
												}
											>
												Accept
											</Button>
											<Button
												startIcon={
													<HighlightOffRoundedIcon />
												}
												color="error"
												onClick={() =>
													removeRequest(row.email)
												}
											>
												Delete
											</Button>
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
		</Paper>
	);
}
