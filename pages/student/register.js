import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Navbar from '@/components/Navbar';
import RegisterForm from '@/components/student/RegisterForm';

export default function Register() {
  return (
    <div>
      <Navbar />
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <PersonAddIcon sx={{ fontSize: 40, mr: 2 }} />
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
      </Box>
      <RegisterForm />   
    </div>
  )
}
