import supabase from '../../supabaseClient';

//get all students attendance
export const fetchAttendance = async () => {
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .order("date", { ascending: false })
    .order("firstName", { ascending: true })
    .order("classroom", { ascending: true })
    .limit(30);
  console.log(data);
  if (error) {
    console.log(error);
  }
  return data;
};