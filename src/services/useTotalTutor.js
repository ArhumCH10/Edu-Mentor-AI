import toast from "react-hot-toast";
import { useMutation } from "react-query";
import {getTotalTutor} from "../services/teacherDataApi";



export function useTotalTutor(setTotalTutor,setLoading) {
    const {mutate} =  useMutation({
        mutationFn: getTotalTutor,
        onSuccess: (data) => {
            toast.success("Total Tutor get Successfully");
            //console.log("Total Tutor data:", data);
            setTotalTutor(data);
            setLoading(false);

        },
        onError: (err) => {
            toast.error(err.message);
            setLoading(false);
        }
    })
    return {mutate};
}
