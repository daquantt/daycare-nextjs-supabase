import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import MenuIcon from '@mui/icons-material/Menu';
import NavLink from "./NavLink";

const pages = [
  'home',
  ['student', 'register', 'listing'],
  ['attendance', 'create', 'view', 'hours report', 'class report'],
  'contact'
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>

        {/* wide nav */}
        <EscalatorWarningIcon sx={{ display: { xs: 'none', md: 'flex' }, fontSize: 30 , mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          DayCareDash
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'right' }}>
          {pages.map((page, index) => (            
            !Array.isArray(page)
            ?            
            <Button
              key={index}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              href={page == "home" ? '/' : '/' + page}
            >
              {page}
            </Button> 
            :
            <NavLink key={index} menuItem={page}/>
          ))}
        </Box>

        {/* mobile nav */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {pages.map((page, index) => (
              !Array.isArray(page)
              ?            
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 1, color: 'inherit', display: 'block' }}
                href={page == "home" ? '/' : page}
              >
                {page}
              </Button> 
              :
              <NavLink key={index} menuItem={page}/>
            ))}
          </Menu>
        </Box>

        <EscalatorWarningIcon sx={{ display: { xs: 'flex', md: 'none' }, fontSize: 30 , mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            fontFamily: 'monospace',
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          DayCareDash
        </Typography>
        
      </Toolbar>
    </Container>
  </AppBar>
}