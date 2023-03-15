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
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';


interface Column {
	id: 'name' | 'phone' | 'email'| 'action';
	label: string;
	minWidth?: number;
	align?: 'center';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'Name', minWidth: 200, align:'center' },
	{ id: 'phone', label: 'Mobile(+1)', minWidth: 200, align:'center' },
	{ id: 'email', label: 'E-mail', minWidth: 200, align:'center' },
	{ id: 'action', label: 'Action', minWidth: 200, align:'center'},
];

interface Data {
	name: string;
	phone: number;
	email: string
	action: boolean;
}

function createData(
	name: string,
	phone: number,
	email: string,
	action: boolean,
): Data {
	return { name, phone,email,action};
}

const rows = [
	createData('John Wick', 234567890, 'john@wick.com',true),
	createData('Sam Willam', 234567890, 'sam@will.com',true),
	createData('Ron Shawn', 234567890, 'ron@shawn.com',true),
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
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
							const isHidden = hiddenRows.includes(index);
							if (isHidden) {
								return null;
							}
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.phone}>
									<TableCell key={columns[0].id} align={columns[0].align}>
										{row[columns[0].id]}
									</TableCell>
									<TableCell key={columns[1].id} align={columns[1].align}>
										{row[columns[1].id]}
									</TableCell>
									<TableCell key={columns[2].id} align={columns[2].align}>
										{row[columns[2].id]}
									</TableCell>
									<TableCell key={columns[3].id} align={columns[3].align}>
										<Button startIcon={<CheckCircleOutlineRoundedIcon/>} color="success" onClick={() => handleHideRow(index)}>Accept</Button>
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
