import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { about } from "../../services/teacherDataApi";

export function useAbout() {

  const { mutate } = useMutation({
    mutationFn: about,
    onSuccess: () => {
      toast.success("Data Saved Successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate};
}
