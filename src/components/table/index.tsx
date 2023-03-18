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
import RadioGroupAvailability from '../radio-button';
import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { green, red } from '@mui/material/colors';

function createData(
  ClinicName: string,
  Address: string,
  Email: string,
): { ClinicName: string; Address: string; Email: string; history: { doctorName: string; doctorDesignation: string; doctorAvailability: boolean; }[]; } {
  return {
    ClinicName,
    Address,
    Email,
    history: [
      {
        doctorName: 'Simran Arora',
        doctorDesignation: 'Psychologist',
        doctorAvailability: true,
      },
      {
        doctorName: 'Dhruv Nair',
        doctorDesignation: 'Physician',
        doctorAvailability: false,
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">Clinic Availability</Typography>
                <RadioGroupAvailability />
            </Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>Availability</TableCell>
                  </TableRow>
                </TableHead> 
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.doctorName}>
                      <TableCell component="th" scope="row">
                        {historyRow.doctorName}
                      </TableCell>
                      <TableCell>{historyRow.doctorDesignation}</TableCell>
                      <TableCell align="right">
                       <Circle available={historyRow.doctorAvailability} />
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

const Circle = styled(Avatar)<{ available: boolean }>(
    ({ theme, available }) => ({
      backgroundColor: available ? green[500] : red[500],
    })
  );

const rows = [
  createData('ABC clinic', "123 West Ave", "sam@example.com"),
  createData('XYZ clinic', "234 South Ave", "ravi@example.com"),
  createData('QWE clinic', "262 Bridge Ave", "scarlet@example.com"),
  createData('ZXC clinic', "305 Rankin Ave", "cupcake@example.com"),
  createData('ASD clinic', "356 Randolph Ave", "gingerbread@example.com"),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Clinic Name</TableCell>
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
