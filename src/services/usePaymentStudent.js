import { useQuery } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export function usePaymentStudent() {
  const queryInfo = useQuery('payments', fetchPayment);

  return {
    ...queryInfo, // Spread all properties from the queryInfo object
    refetchPayments: queryInfo.refetch, // Specifically expose the refetch function under a more apt name
  };
}

const fetchPayment = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user')); 
      const email = userData?.email; // Ensure email is correctly referenced; add optional chaining for safety

      if (!email) throw new Error("Email not found. Please log in again."); // Check if email is not found
  
      const response = await axios.get(`http://localhost:8080/students/payments?email=${email}`);
      return response.data;
    } catch (error) {
      // Check if the error is due to no payment information found (404)
      if (error.response && error.response.status === 404) {
        return []; // Return an empty array when no payment information is found
      }
  
      // For other errors, display a toast with an appropriate message
      let message = "Error Fetching Payment Details";
      if (error.response) {
        switch(error.response.status) {
          case 403:
            message = "Access Denied.";
            break;
          case 500:
            message = "Server Error.";
            break;
          default:
            message = "An Unexpected Error Occurred.";
        }
      }
      toast.error(message);
      throw new Error(message); // Rethrow an error with a specific message
    }
  };
  
