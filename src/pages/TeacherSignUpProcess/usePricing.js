import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { pricing } from "../../services/teacherDataApi";

export function usePricing(setFlag,setLoading) {

  const { mutate } = useMutation({
    mutationFn: pricing,
    onSuccess: () => {
      toast.success("Registration Successfull");
      setFlag(true);
    },
    onError: (err) => {toast.error(err.message);setLoading(false);}
  });

  return { mutate};
}
