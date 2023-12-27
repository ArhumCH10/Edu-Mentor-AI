import axios from "axios";
import toast from "react-hot-toast";

export async function signup({ email, password }) {
    try {
      const response = await axios.post("http://localhost:8080/teacher/signup", {
        email,
        password,
      });
      if (response.status === 201) {
        return true; // Indicate success to the calling code
      } else {
        return false; // Indicate failure to the calling code
      }
    } catch (error) {
      // Show toast message for error during user creation
      if (error.response && error.response.status === 400) {
        toast.error("Email already exists.");
      } else if (error.response && error.response.status === 401) {
        toast.error("Password must contain at least one capital letter and one special character.");
      }
  
      throw error; // Re-throw the error for React Query to handle
    }
  }