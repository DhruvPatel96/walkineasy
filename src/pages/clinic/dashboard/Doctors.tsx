import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Button} from "@mui/material";
import {useState} from "react";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";


interface Column {
	id: 'name' | 'designation' | 'action';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'designation', label: 'Designation', minWidth: 100 },
	{
		id: 'action',
		label: 'Action',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US'),
	},
];

interface Data {
	name: string;
	designation: string;
	action: boolean;
}

function createData(
	name: string,
	designation: string,
	action: boolean,
): Data {
	return { name, designation, action};
}

const rows = [
	createData('Anureet Kaur', 'Dietitian', true),
	createData('Simran Arora', 'Psychologist', true),
	createData('Dhruv Nair', 'Physician', true),
	createData('Harman Singh', 'Surgeon', true),
	createData('Dhruv Patel', 'Nurse', true),
];
export default function ColumnGroupingTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

	return (
		<Paper sx={{ width: '100%' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
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
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
							const isHidden = hiddenRows.includes(index);
							if (isHidden) {
								return null;
							}
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.designation}>
									<TableCell key={columns[0].id} align={columns[0].align}>
										{row[columns[0].id]}
									</TableCell>
									<TableCell key={columns[1].id} align={columns[1].align}>
										{row[columns[1].id]}
									</TableCell>
									<TableCell key={columns[2].id} align={columns[2].align}>
										<Button startIcon={<HighlightOffRoundedIcon/>} color="error" onClick={() => handleHideRow(index)}>Delete</Button>
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
