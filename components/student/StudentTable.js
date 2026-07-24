
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StudentTableRow from './StudentTableRow';

export default function StudentTable(props) {
  const { students } = props

  return (
    <Container maxWidth='md'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, backgroundColor: '#000' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Full Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Date of Birth</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Classroom</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Active</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <StudentTableRow key={student.id} student={student} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
