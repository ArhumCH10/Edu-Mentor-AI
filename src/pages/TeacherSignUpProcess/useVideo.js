import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { video } from "../../services/teacherDataApi";

export function useVideo(setFlag,setLoading) {

  const { mutate } = useMutation({
    mutationFn: video,
    onSuccess: () => {
      toast.success("Data Saved Successfully");
      setFlag(true);
    },
    onError: (err) => {
      toast.error(err.message);
      setLoading(false);
    }
  });

  return { mutate};
}
