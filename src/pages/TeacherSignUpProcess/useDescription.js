import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { description } from "../../services/teacherDataApi";

export function useDescription(setFlag,setLoading) {

  const { mutate } = useMutation({
    mutationFn: description,
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
