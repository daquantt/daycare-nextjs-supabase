import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

import { updateStudent, deleteStudent } from '@/utils/api/students';
import CustomSnackbar from '../CustomSnackbar';
import { FormGroup } from '@mui/material';

export default function EditForm(props) {
  const { student } = props
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: dayjs(),
    classroom: '',
    active: 'false',
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

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        birthDate: student.birthDate ? dayjs(student.birthDate) : dayjs(),
        classroom: student.classroom.toLowerCase(),
        active: student.active === 'Y' ? true : false
      })
    }
  }, [student])

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  
  const validateForm = () => {
    let errors = {} // Temporary object to collect errors

    if (formData.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters"
    }
    if (formData.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters"
    }
    if (dayjs(formData.birthDate).isAfter(dayjs(), "day")) {
      errors.birthDate = "Date of birth must be in the past"
    }
    if (!["amber", "ruby", "pearl"].includes(formData.classroom)) {
      errors.classroom = "Classroom must be one of: Amber, Ruby, or Pearl"
    }

    // Set all errors at once, instead of overwriting on each condition
    setFormErrors(errors)

    // return true if errors object has no keys
    return Object.keys(errors).length === 0
  }

  const handleForm = async (event) => {
    event.preventDefault()
    
    setSnackbar({ open: false, severity: "", text: "" })

    if (!validateForm()) return

    const updatedStudent = {
      id: student.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate,
      classroom: formData.classroom,
      active: formData.active ? 'Y' : 'N'
    }
    console.log(updatedStudent)

    try {
      const response = await updateStudent(updatedStudent)

      setSnackbar({
        open: true,
        severity: response?.success ? "success" : "error",
        text: response?.success ? "Student updated successfully" : "Error updating student",
      })    
    } catch (error) {
      console.log(error)
      setSnackbar({ open: true, severity: "error", text: "Error updating student" })
    }
  }

  const onDeleteClick = async () => {
    const confirm = window.confirm(`Are you sure you want to delete ${formData.firstName} ${formData.lastName}?`)

    if (!confirm) return

    try {
      const response = await deleteStudent(student.id)

      if (response && response.success) { // Ensure response is successful
        // Store snackbar state in localStorage or context before navigating
        localStorage.setItem("snackbar", JSON.stringify({
          open: true,
          severity: "success",
          text: `${formData.firstName} ${formData.lastName} deleted successfully`,
        }));

        router.push('/student/listing')        
      }      
    } catch (error) {
      console.log(error)
      setSnackbar({ open: true, severity: "error", text: "Error deleting student." })
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
        <FormGroup
          row
          sx={{
            justifyContent: 'center',
            gap: 3
          }}
        >
          <Button
            variant="contained"
            type="submit"       
            sx={{
              color: '#fff',
              backgroundColor: green[900],
              "&:hover": { color: '#000', backgroundColor: green[500] }
            }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            type="button"
            color="error"
            onClick={onDeleteClick}
            >
            Delete
          </Button>
          <Button
            variant="contained"
            type="button"
            color="secondary"
            onClick={() => router.push('/student/listing')}
            >
            Return
          </Button>
        </FormGroup>
        <CustomSnackbar open={snackbar.open} severity={snackbar.severity} text={snackbar.text} />
      </form>

    </Container>
  );
}