import { useMutation } from "react-query";
import { fetchTutorsSearchAPI } from "../../../services/teacherDataApi";
import toast from "react-hot-toast";

export function useSearchTutors(setSkeltonLoading,setTutorArray) {
    const { mutate } = useMutation(fetchTutorsSearchAPI, {
        onSuccess: (data) => {
            setTutorArray(data);
            setSkeltonLoading(false);
        },
        onError: (err) => {
            setSkeltonLoading(false);
            toast.error("Error searching for tutors: " + err.message);
            console.error("Error searching for tutors:", err);
        }
    });

    return { mutate };
}
