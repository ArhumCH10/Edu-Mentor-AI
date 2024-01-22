import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { photo } from "../../services/teacherDataApi";

export function usePhoto() {

  const { mutate } = useMutation({
    mutationFn: photo,
    onSuccess: () => {
      toast.success("Data Saved Successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate};
}
