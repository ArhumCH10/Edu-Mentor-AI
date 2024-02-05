import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { certificate } from "../../services/teacherDataApi";

export function useCertificate(setFlag,setLoading) {

  const { mutate } = useMutation({
    mutationFn: certificate,
    onSuccess: () => {
      toast.success("Data Saved Successfully");
      setFlag(true);
    },
    onError: (err) =>{ 
      toast.error(err.message);
      setLoading(false);
    }
  });

  return { mutate};
}
