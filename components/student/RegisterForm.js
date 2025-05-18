import { useState } from 'react';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';

import { addStudent } from '@/utils/api/students';
import CustomSnackbar from '../CustomSnackbar';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: dayjs(),
    classroom: '',
    active: false,
  })

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    classroom: '',
  })

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: '',
    text: '',
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  
  const validateForm = () => {
    let errors = {}; // Temporary object to collect errors

    if (formData.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }
    if (formData.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }
    if (dayjs(formData.birthDate).isAfter(dayjs(), "day")) {
      errors.birthDate = "Date of birth must be in the past";
    }
    if (!["amber", "ruby", "pearl"].includes(formData.classroom)) {
      errors.classroom = "Classroom must be one of: Amber, Ruby, or Pearl";
    }

    // Set all errors at once, instead of overwriting on each condition
    setFormErrors(errors);

    // return true if errors object has no keys
    return Object.keys(errors).length === 0;
  }

  const handleForm = async (event) => {
    event.preventDefault()
    
    setSnackbar({ open: false, severity: "", text: "" })

    if (!validateForm()) return

    const newStudent = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate,
      classroom: formData.classroom,
      active: formData.active ? 'Y' : 'N'
    }

    try {
      const response = await addStudent(newStudent)

      setSnackbar({
        open: true,
        severity: response?.success ? "success" : "error",
        text: response?.success ? "Student added successfully" : "Error adding student",
      })
      
      if (response && response.success) { // Ensure response is successful
        // Reset Form
        setFormData({ firstName: "", lastName: "", birthDate: dayjs(), classroom: "", active: false })
      }      
    } catch (error) {
      console.log(error)
      setSnackbar({ open: true, severity: "error", text: "Error adding student" })
    }
  }

  return (
    <Container maxWidth='sm'>
      <form onSubmit={handleForm}>
        <TextField
          id="first-name"
          name='firstName'
          label="First Name"
          variant="filled"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.firstName}
          onChange={handleChange}
          error={!!formErrors.firstName}
          helperText={formErrors.firstName}          
          autoComplete='no'
        />
        <TextField
          id="last-name"
          name='lastName'
          label="Last Name"
          variant="filled"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.lastName}
          onChange={handleChange}
          error={!!formErrors.lastName}
          helperText={formErrors.lastName}
        />        
        <DatePicker          
          name='birthDate'
          label="Date of Birth"
          sx={{ mb: 2, width: '100%' }}
          value={dayjs(formData.birthDate)}
          onChange={(e) => setFormData({ ...formData, birthDate: e })}
          slotProps={{
            textField: {
              name: "birthDate",
              helperText: formErrors.birthDate,
            },
          }}
        />

        <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
          <InputLabel id="classroom">Classroom</InputLabel>
          <Select
            labelId="classroom"
            id="classroom-select"
            name='classroom'
            value={formData.classroom}
            label="Classroom"
            onChange={handleChange}
          >
            <MenuItem value="amber">Amber</MenuItem>
            <MenuItem value="ruby">Ruby</MenuItem>
            <MenuItem value="pearl">Pearl</MenuItem>
          </Select>
          <FormHelperText>{formErrors.classroom}</FormHelperText>
        </FormControl>
        <FormControlLabel
          name="active"
          value="bottom"
          control={
            <Switch
              color="warning"
              checked={formData.active}
              onChange={(e) => {setFormData({ ...formData, active: e.target.checked })}}
              slotProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Active Status"
          labelPlacement="start"
          sx={{ mb: 2 }} 
        />
        <Button
          variant="contained"
          type="submit"       
          sx={{ 
            display: "block",
            mx: "auto",
            color: '#fff',
            backgroundColor: green[900],
            "&:hover": { color: '#000', backgroundColor: green[500] }
          }}
        >
          Register
        </Button>
        <CustomSnackbar open={snackbar.open} severity={snackbar.severity} text={snackbar.text} />
      </form>

    </Container>
  );
}