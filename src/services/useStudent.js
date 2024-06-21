import { useQuery } from 'react-query';
import axios from 'axios';
import toast from "react-hot-toast";

export function useStudent() {
  const queryInfo = useQuery('user', fetchUser);

  return {
    ...queryInfo, // Spread all properties from the queryInfo object
    refetchUser: queryInfo.refetch, // Specifically expose the refetch function
  };
}

const fetchUser = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user")); 
    const email = userData && userData.email;
  
    const response = await axios.get(`http://localhost:8080/students/user?email=${email}`);
    console.log(response);
    return response.data;
    
  } catch (error) {
    const message = error.response?.status === 404
      ? "Student Not Found."
      : "Error Fetching details";
    toast.error(message);
    throw error; 
  }
};

