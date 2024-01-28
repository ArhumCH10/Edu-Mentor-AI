import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { availability } from "../../services/teacherDataApi";

export function useAvailability() {

  const { mutate } = useMutation({
    mutationFn: availability,
    onSuccess: () => {
      toast.success("Data Saved Successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate};
}
