import { useMutation } from "react-query";
import { fetchTutorsSearchAPI,fetchTutorsSearchByEmailAPI } from "../../../services/teacherDataApi";
import toast from "react-hot-toast";

export function useSearchTutors(setSkeltonLoading,setTutorArray, email) {
    const fetchTutors = email ? fetchTutorsSearchByEmailAPI : fetchTutorsSearchAPI;
    
    const { mutate } = useMutation(fetchTutors, {
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
