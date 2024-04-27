import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuth";
import { useAuth } from '../../AuthContext';
import { useUser } from '../../UserContext';

export function useSignin() {
  const navigate = useNavigate();
 const { loginFrontend } = useAuth();
 const { fetchUserData } = useUser();
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      toast.success("Login Successfully");
      loginFrontend();
      if (data.isRegistered) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate('/dashboardlinks', { replace: true });
      } else {
          navigate('/tutor-signup', { replace: true });
      }

      await fetchUserData();
    },
    onError: (err) => {
      toast.error(err.message);

      // Handle specific error scenarios if needed
      if (err.response?.status === 401) {
        // Handle unauthorized access
        toast.error(err.message ,'error status is 401');
      }
    },
  });

  return { mutate };
}
