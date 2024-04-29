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
      else if (error.response && error.response.status === 402) {
        toast.error("Email already registered as Student.");
      }
  
      throw error; // Re-throw the error for React Query to handle
    }
  }

export async function login({ email, password }) {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
  
      // Assuming your server returns a token in the response
      const token = response.data.token;
  
      // Store the token in local storage or in your preferred state management
      localStorage.setItem('token', token);
      document.cookie = `token=${token}; path=/; samesite=strict; secure`;

      if(response.status === 200)
      {
        console.log(response.data);
        return response.data;
      }
      else {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response && error.response.status === 400) {
        toast.error("Invalid email or password.");
      } else if (error.response && error.response.status === 401) {
        toast.error("User not Registered");
      }
      else if(error.response && error.response.status === 402)
      {
        toast.error("User not Verified");
      }
  
      throw error; // Re-throw the error for React Query to handle
    }
}

export async function loginStudent({ studentemail, studentpassword, handleShowVerifyModal  }) {
  const response = await axios.post("http://localhost:8080/student/login", {
    email: studentemail,
    password: studentpassword,
  });

  const token = response.data.token;
  localStorage.setItem('token', token);
  document.cookie = `token=${token}; path=/; samesite=strict; secure`;
  
  if (response.status === 200 && response.data.isVerified === false) {
    console.log("Not verified");
    handleShowVerifyModal();
    return  { isVerified: false, data: response.data };
  }
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return { isVerified: true, data: response.data };
}