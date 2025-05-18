import "@/styles/globals.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const theme = createTheme({
  colorSchemes: {
    dark: true, // add dark theme 
  },
  typography: {
    fontSize: 16, // Change default font size to 16px
  },
});

export default function App({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Component {...pageProps} />
    </LocalizationProvider>
  </ThemeProvider>
}
