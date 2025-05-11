import "@/styles/globals.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
    <Component {...pageProps} />
  </ThemeProvider>
}
