import { useEffect, useState } from "react";

import Typography from '@mui/material/Typography';

import Navbar from '@/components/Navbar';
import StudentTable from '@/components/student/StudentTable';
import CustomSnackbar from "@/components/CustomSnackbar";

import { fetchStudents } from "@/utils/api/students";

export default function Listing() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [snackbar, setSnackbar] = useState({ open: false, severity: "", text: "" })

  useEffect(() => {
    const getStudents = async () => {
      setLoading(true)
      try {
        const StudentData = await fetchStudents()
        setStudents(StudentData)

      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    getStudents()

    const storedSnackbar = localStorage.getItem("snackbar");
    if (storedSnackbar) {
      setSnackbar(JSON.parse(storedSnackbar));
      localStorage.removeItem("snackbar"); // Clear snackbar after showing
    }
  }, [])

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Something went wrong. Please try again...</div>;
  }

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
        Student Listing
      </Typography>  
      <StudentTable students={students} />
      <CustomSnackbar open={snackbar.open} severity={snackbar.severity} text={snackbar.text} />
    </div>
  )
}
