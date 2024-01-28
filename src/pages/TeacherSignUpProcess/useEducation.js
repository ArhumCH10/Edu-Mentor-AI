import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { education } from "../../services/teacherDataApi";

export function useEducation() {

  const { mutate } = useMutation({
    mutationFn: education,
    onSuccess: () => {
      toast.success("Data Saved Successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate};
}
