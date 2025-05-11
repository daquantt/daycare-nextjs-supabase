import Link from "next/link";
import { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import { capitalizeWord, changeSpaceToDash } from "@/utils/functions";

export default function NavLink(pages) {
  const { menuItem } = pages

  const [menuName, setMenuName] = useState(menuItem[0]);  
  const [subMenuItems, setSubMenuItems] = useState([]);  
  const [anchorEl, setAnchorEl] = useState(null);  
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function getMenuItems(pages) {
    let items = pages.map(page => page)
    items.shift()
    setSubMenuItems(items)
  }

  useEffect(() => {
    getMenuItems(menuItem)
  }, [])

  return (
    <Box sx={{ marginY: 'auto'}}>
      <Button
        id="nav-button"
        aria-controls={open ? 'nav-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ my: 1, color: 'inherit' }}
        endIcon={<KeyboardArrowDown />}
      >
        {menuName}
      </Button>
      <Menu
        id="nav-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          'aria-labelledby': 'nav-button',
        }}
      >
        {subMenuItems.map((item) => (
          <MenuItem key={item} onClick={handleClose}>
            <Link
              href={'/' + menuName + '/' + changeSpaceToDash(item)}
              sx={{ textAlign: 'center' }}
            >
              {capitalizeWord(item)}
            </Link>
          </MenuItem>
        ))}        
      </Menu>
    </Box>
  );
}
