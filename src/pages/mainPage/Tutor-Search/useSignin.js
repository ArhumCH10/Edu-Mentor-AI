import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginStudent } from "../../../services/apiAuth";

export function useSignin({ setSignUpEmail, setSignUpPassword,handleShowScheduleModal}) {
    const navigate = useNavigate();
  
    const { mutate } = useMutation({
      mutationFn: loginStudent,
      onSuccess: async (data) => {
        if (data.isVerified) {
          toast.success("Login Successfully");
          setSignUpEmail('');
          setSignUpPassword('');
          handleShowScheduleModal();
          localStorage.setItem('verified', true);
          navigate("/tutors-search/*");
        } else {
          toast.success("Verification Code sent to the email");
        }
      },
      onError: (err) => {
        toast.error(err.message);
        if (err.response?.status === 401) {
          toast.error("Unauthorized access");
        }
        if (err.response?.status === 400) {
          toast.error("Invalid email or password");
        }
      },
    });
  
    return { mutate };
  }