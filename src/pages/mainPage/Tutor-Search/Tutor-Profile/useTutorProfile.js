import { useMutation } from "react-query";
import { fetchTutorProfile } from "../../../../services/teacherDataApi";
import toast from "react-hot-toast";

export function useTutorProfile(setTutorProfileData,setIsLoading) {
    const { mutate } = useMutation(fetchTutorProfile, {
        onSuccess: (data) => {
            setTutorProfileData(data);
            setIsLoading(false);
        },
        onError: (err) => {
            setIsLoading(false);
            toast.error("Error for tutor Profile: " + err.message);
            console.error("Error for tutor profile:", err);
        }
    });

    return { mutate };
}
