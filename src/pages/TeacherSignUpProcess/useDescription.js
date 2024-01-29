import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { description } from "../../services/teacherDataApi";

export function useDescription() {

  const { mutate } = useMutation({
    mutationFn: description,
    onSuccess: () => {
      toast.success("Data Saved Successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate};
}
