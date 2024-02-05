import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { photo } from "../../services/teacherDataApi";

export function usePhoto(setFlag,setLoading) {

  const { mutate } = useMutation({
    mutationFn: photo,
    onSuccess: () => {
      toast.success("Data Saved Successfully");
      setFlag(true);
    },
    onError: (err) => {
      toast.error(err.message),
      setLoading(false);
    }
  });

  return { mutate};
}
