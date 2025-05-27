import supabase from '../../supabaseClient';

//get all students
export const fetchStudents = async () => {
  const { data, error } = await supabase.from("students").select("*").order("firstName", { ascending: true });
  if (error) {
    console.log(error)
  }
  return data
};

export const addStudent = async (newStudent) => {
  const { data, error } = await supabase
    .from("students")
    .insert(newStudent)
  if (error) {
    console.log("Error adding student", error)
    return { success: false, error }
  }
  return { success: true, data }
};

export const fetchOneStudent = async (id) => {
  const { data, error } = await supabase
    .from("students")
    .select()
    .eq("id", id)
    .single()
  if (error) {
    console.log(error, "Error fetching one student by id")
  }
  return data
};

// update student
export const updateStudent = async (student) => {
  const { data, error } = await supabase
    .from("students")
    .update(student)
    .eq("id", student.id)
    .select() // Ensures response returns updated data
  if (error) {
    console.log(error)
    return { success: false, error }
  }
  return { success: true, data }
};

// delete student
export const deleteStudent = async (id) => {
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id)
    .select()
  if (error) {
    console.log(error)
    return { success: false, error }
  }
  return { success: true }
};

