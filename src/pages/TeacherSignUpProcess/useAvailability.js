import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { availability } from "../../services/teacherDataApi";

export function useAvailability(setFlag,setLoading) {

  const { mutate } = useMutation({
    mutationFn: availability,
    onSuccess: () => {
      toast.success("Data Saved Successfully");
      setFlag(true);
    },
    onError: (err) => {toast.error(err.message);setLoading(false);}
  });

  return { mutate};
}
