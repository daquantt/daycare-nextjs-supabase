import { useEffect, useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomSnackbar(props) {
  const { open, severity, text } = props
  
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  return (
    <div>      
      <Snackbar 
        open={isOpen} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}
