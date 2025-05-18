import supabase from '../../supabaseClient';

//get all students
export const fetchStudents = async () => {
  const { data, error } = await supabase.from("students").select("*").order("firstName", { ascending: true });
  if (error) {
    console.log(error);
  }
  return data;
};

export const addStudent = async (newStudent) => {
  const { error } = await supabase.from("student").insert(newStudent);
  if (error) {
    console.log("Error adding student", error);
  }
  return;
};

