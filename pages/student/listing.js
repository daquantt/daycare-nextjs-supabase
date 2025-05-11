import { useEffect, useState } from "react";

import Typography from '@mui/material/Typography';

import Navbar from '@/components/Navbar';
import StudentTable from '@/components/student/StudentTable';
import { fetchStudents } from "@/utils/api/students";

export default function Listing() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

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
    </div>
  )
}
