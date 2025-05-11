import Typography from '@mui/material/Typography';

import Navbar from '@/components/Navbar';

export default function Register() {
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
        Register Student
      </Typography>     
    </div>
  )
}
