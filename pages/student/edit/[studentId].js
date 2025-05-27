import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';

import Navbar from '@/components/Navbar';
import EditForm from '@/components/student/EditForm';

import { fetchOneStudent } from '@/utils/api/students';

export default function Edit() {
  const [student, setStudent] = useState()

  const router = useRouter()

  const {studentId} = router.query

  const loadStudent = async () => {
    const data = await fetchOneStudent(studentId)

    setStudent(data)
  }

  useEffect(() => {
    if (!studentId) {
      return
    }

    loadStudent()
  }, [studentId])

  return (
    <div>
      <Navbar />
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <EditIcon sx={{ fontSize: 40, mr: 2 }} />
        <Typography
          variant="h4"          
          component="h2"
          sx={{ 
            fontWeight: 700,
            textAlign: 'center',
            marginY: 4
           }}
        >          
          Edit Student
        </Typography>
      </Box>
      <EditForm student={student}/>
    </div>
  )
}
