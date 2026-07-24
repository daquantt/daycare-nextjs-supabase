import Link from 'next/link';
import dayjs from 'dayjs';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { capitalizeWord } from '@/utils/functions';

export default function AttendanceTableRow(props) {
  const { attendance } = props

  const birthDate = new Date(attendance.birthDate);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {attendance.firstName} {attendance.lastName}
      </TableCell>
      <TableCell align="right">{attendance.id}</TableCell>
      <TableCell align="right">{dayjs(attendance.birthDate).format('DD-MMM-YYYY')}</TableCell>
      <TableCell align="right">{capitalizeWord(attendance.classroom)}</TableCell>
      <TableCell align="right">{attendance.active}</TableCell>
      <TableCell align="right">
        <Link href={`/attendance/edit/${attendance.id}`}>
          Edit
        </Link>
      </TableCell>
    </TableRow>
  );
}


