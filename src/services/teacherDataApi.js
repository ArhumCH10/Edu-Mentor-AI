import axios from "axios";
import toast from "react-hot-toast";

export async function about({ firstName, lastName, country, subject, languages, levels, phone, isOver18 }) {
    try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage

        const response = await axios.post("http://localhost:8080/about", {
            firstName,
            lastName,
            country,
            subject,
            languages,
            levels,
            phone,
            isOver18,
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the Authorization header
            }
        });

        if (response.status === 200) {
            return true; // Indicate success to the calling code
        } else {
            return false; // Indicate failure to the calling code
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toast.error("Data not inserted");
        } else if (error.response && error.response.status === 500) {
            toast.error("Error Occurred");
        }

        throw error;
    }
}


export async function getUserData() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/user-data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function photo({ fileStore }) {
  try {
    console.log("My file data :",fileStore);

    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    const formData = new FormData();
        formData.append('photo', fileStore);
      const response = await axios.post("http://localhost:8080/photo",  formData,{
          headers: {
            Authorization: `Bearer ${token}`,
            //'Content-Type': 'multipart/form-data',
        },
        });
        console.log("Response from server:", response.data);

      if (response.status === 200) {
          return true; // Indicate success to the calling code
      } else {
          return false; // Indicate failure to the calling code
      }
  } catch (error) {
      if (error.response && error.response.status === 400) {
          toast.error("Photo not inserted");
      } else if (error.response && error.response.status === 500) {
          toast.error("Error Occurred");
      }

      throw error;
  }
}