import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import BasicModal from "../../components/modal";

function createData(
  ClinicName: string,
  Address: string,
  Email: string,
): { ClinicName: string; Address: string; Email: string; history: { date: string; customerId: string; amount: number; }[]; } {
  return {
    ClinicName,
    Address,
    Email,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? "-" : "+"}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.ClinicName}
        </TableCell>
        <TableCell align="center">{row.Address}</TableCell>
        <TableCell align="center">{row.Email}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Doctor's Availability
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell align="right">Availability</TableCell>
                  </TableRow>
                </TableHead> 
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">
        
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography style={{ paddingBottom: 0, paddingTop: 30 }} variant="h6" gutterBottom component="div">
                Equipment Availability
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                    label="X-Ray Machine"
                    deleteIcon={<DoneIcon />}
                />
                <Chip
                    label="Thermometer"
                    deleteIcon={<DoneIcon />}
                />
              </Stack>
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

const rows = [
  createData('Sam', "123 West Ave", "sam@example.com"),
  createData('Ravi', "234 South Ave", "ravi@example.com"),
  createData('Scarlet', "262 Bridge Ave", "scarlet@example.com"),
  createData('Cupcake', "305 Rankin Ave", "cupcake@example.com"),
  createData('Gingerbread', "356 Randolph Ave", "gingerbread@example.com"),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Client Name</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.ClinicName} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
