import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { certificate } from "../../services/teacherDataApi";

export function useCertificate() {

  const { mutate } = useMutation({
    mutationFn: certificate,
    onSuccess: () => {
      toast.success("Data Saved Successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate};
}
