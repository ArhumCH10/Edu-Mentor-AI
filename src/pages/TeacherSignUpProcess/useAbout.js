import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { about } from "../../services/teacherDataApi";

export function useAbout(setFlag,setLoading) {

  const { mutate } = useMutation({
    mutationFn: about,
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
