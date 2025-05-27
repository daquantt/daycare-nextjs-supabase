import Link from 'next/link';
import dayjs from 'dayjs';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { capitalizeWord } from '@/utils/functions';

export default function StudentTableRow(props) {
  const { student } = props

  const birthDate = new Date(student.birthDate);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {student.firstName} {student.lastName}
      </TableCell>
      <TableCell align="right">{student.id}</TableCell>
      <TableCell align="right">{dayjs(student.birthDate).format('DD-MMM-YYYY')}</TableCell>
      <TableCell align="right">{capitalizeWord(student.classroom)}</TableCell>
      <TableCell align="right">{student.active}</TableCell>
      <TableCell align="right">
        <Link href={`/student/edit/${student.id}`}>
          Edit
        </Link>
      </TableCell>
    </TableRow>
  );
}


