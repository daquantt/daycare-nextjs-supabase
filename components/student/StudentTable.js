
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StudentTableRow from './StudentTableRow';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function StudentTable(props) {
  const { students } = props

  return (
    <Container maxWidth='md'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, backgroundColor: '#000' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Full Name</TableCell>
              <TableCell align="right"sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell align="right"sx={{ fontWeight: 600 }}>Date of Birth</TableCell>
              <TableCell align="right"sx={{ fontWeight: 600 }}>Classroom</TableCell>
              <TableCell align="right"sx={{ fontWeight: 600 }}>Active</TableCell>
              <TableCell align="right"sx={{ fontWeight: 600 }}>Edit</TableCell>
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
