import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { education } from "../../services/teacherDataApi";

export function useEducation(setFlag,setLoading) {

  const { mutate } = useMutation({
    mutationFn: education,
    onSuccess: () => {
      toast.success("Data Saved Successfully");
      setFlag(true);
    },
    onError: (err) => {
      toast.error(err.message);
      setLoading(false);
    }
  });

  return { mutate};
}
