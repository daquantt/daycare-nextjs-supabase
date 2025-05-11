import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';

import Navbar from "@/components/Navbar";

export default function Home() {
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
        Welcome to DayCareDash
      </Typography>  
      <EscalatorWarningIcon sx={{ fontSize: 60, display:'block', marginX: 'auto' }} />
      <Typography sx={{ textAlign: 'center', my: 3 }}>
        Select a Classroom
      </Typography>

      <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="contained" color="warning">Amber</Button>
        <Button variant="contained" color="error">Ruby</Button>
        <Button variant="contained" color="primary">Pearl</Button>
      </Stack>

      
    </div>
  );
}
