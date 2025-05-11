import Link from 'next/link';
import dateFormat from "dateformat";

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function StudentTableRow(row) {
  const { student } = row

  const birthDate = new Date(student.birthDate);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {student.firstName} {student.lastName}
      </TableCell>
      <TableCell align="right">{student.id}</TableCell>
      <TableCell align="right">{dateFormat(birthDate, "dd-mmm-yyyy")}</TableCell>
      <TableCell align="right">{student.classroom}</TableCell>
      <TableCell align="right">{student.active}</TableCell>
      <TableCell align="right">
        <Link href={`/edit-student/${student.id}`}>
          Edit
        </Link>
      </TableCell>
    </TableRow>
  );
}


