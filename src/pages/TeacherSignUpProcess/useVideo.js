import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { video } from "../../services/teacherDataApi";

export function useVideo() {

  const { mutate } = useMutation({
    mutationFn: video,
    onSuccess: () => {
      toast.success("Data Saved Successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate};
}
