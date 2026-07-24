
import Typography from '@mui/material/Typography';

import Navbar from '@/components/Navbar';
import AttendanceTable from '@/components/attendance/AttendanceTable';

export default function View() {
  return (
    <div>
      <Navbar />
      <Typography
        variant="h4"          
        component="h2"
        sx={{ 
          fontWeight: 700,
          textAlign: 'center',
          marginY: 4
         }}
      >
        View Attendance
      </Typography>
      <AttendanceTable />  
    </div>
  )
}
