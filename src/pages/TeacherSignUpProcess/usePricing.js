import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { pricing } from "../../services/teacherDataApi";

export function usePricing() {

  const { mutate } = useMutation({
    mutationFn: pricing,
    onSuccess: () => {
      toast.success("Registration Successfull");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate};
}
