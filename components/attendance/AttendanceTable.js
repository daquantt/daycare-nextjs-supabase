
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttendanceTableRow from './AttendanceTableRow';

export default function AttendanceTable(props) {
  const { attendance } = props

  return (
    <Container maxWidth='md'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, backgroundColor: '#000' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Full Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Classroom</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Time In</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Time Out</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((attendance) => (
              <AttendanceTableRow key={attendance.id} attendance={attendance} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
