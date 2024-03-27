import axios from "axios";
import toast from "react-hot-toast";

export async function about({ firstName, lastName, country, subject, languages, levels, phone, isOver18 }) {
    try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage

        const response = await axios.post("http://localhost:8080/about", {
            firstName,
            lastName,
            country,
            subject,
            languages,
            levels,
            phone,
            isOver18,
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the Authorization header
            }
        });

        if (response.status === 200) {
            return true; // Indicate success to the calling code
        } else {
            return false; // Indicate failure to the calling code
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toast.error("Data not inserted");
        } else if (error.response && error.response.status === 500) {
            toast.error("Error Occurred");
        }

        throw error;
    }
}


export async function getUserData() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/user-data', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            //console.log('In getUserData api :',response.data);
            return response.data;

        } else {
            throw new Error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export async function photo({ fileStore }) {
    try {
        console.log("My file data :", fileStore);

        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const formData = new FormData();
        formData.append('photo', fileStore);
        const response = await axios.post("http://localhost:8080/photo", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                //'Content-Type': 'multipart/form-data',
            },
        });
        console.log("Response from server:", response.data);

        if (response.status === 200) {
            return true; // Indicate success to the calling code
        } else {
            return false; // Indicate failure to the calling code
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toast.error("Photo not inserted");
        } else if (error.response && error.response.status === 500) {
            toast.error("Error Occurred");
        }

        throw error;
    }
}

export async function certificate({ subject, certificate, description, issuedBy, yearsOfStudyFrom, certificationPhoto }) {
    try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage

        const response = await axios.post("http://localhost:8080/certificate", {
            subject,
            certificate,
            description,
            issuedBy,
            yearsOfStudyFrom,
            certificationPhoto,
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            return true; // Indicate success to the calling code
        } else {
            return false; // Indicate failure to the calling code
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toast.error("Data not inserted");
        } else if (error.response && error.response.status === 500) {
            toast.error("Error Occurred");
        }

        throw error;
    }
}

export async function education({ university, degree, degreeType, specialization, yearsOfStudyFrom, educationPhoto }) {
    try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.post("http://localhost:8080/education", {
            university,
            degree,
            degreeType,
            specialization,
            yearsOfStudyFrom,
            educationPhoto,
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            return true; // Indicate success to the calling code
        } else {
            return false; // Indicate failure to the calling code
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toast.error("Data not inserted");
        } else if (error.response && error.response.status === 500) {
            toast.error("Error Occurred");
        }

        throw error;
    }
}

export async function description({ introduceYourself, teachingExperience, motivateStudents, catchyHeadline }) {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8080/description", {
            introduceYourself,
            teachingExperience,
            motivateStudents,
            catchyHeadline,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toast.error("Data not inserted");
        } else if (error.response && error.response.status === 500) {
            toast.error("Error Occurred");
        }

        throw error;
    }
}

export async function video({ data, thumbnail }) {
    try {
        //console.log('Video data in teacherDataApi : ',data);
        const formData = new FormData();
        formData.append('data', data);
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }

        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8080/video", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            return true; // Indicate success to the calling code
        } else {
            return false; // Indicate failure to the calling code
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toast.error("Video not inserted");
        } else if (error.response && error.response.status === 500) {
            toast.error("Error Occurred");
        }

        throw error;
    }
}

export async function availability({ timezone, availability }) {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8080/availability", {
            timezone,
            availability
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toast.error("Data not inserted");
        } else if (error.response && error.response.status === 500) {
            toast.error("Error Occurred");
        }

        throw error;
    }
}

export async function pricing({ hourlyPriceUSD }) {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8080/pricing", {
            hourlyPriceUSD
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toast.error("Data not inserted");
        } else if (error.response && error.response.status === 500) {
            toast.error("Error Occurred");
        }

        throw error;
    }
}


export async function getTotalTutor({ subject }) {
    try {
       // console.log('subject in getTotalTutor->:', subject);
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/totalTutor/${subject}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response && response.data) {
           // console.log('response.data:', response.data);
            return response.data.totalTutorCount;
        } else {
            throw new Error("Failed to fetch Total Tutor related to the subject");
        }
    } catch (error) {
        console.error("Error in getTotalTutor:", error);

        toast.error("Error fetching Total Tutor related to the subject");

        
    }
}

export async function fetchTutorsSearchAPI ({searchParams}) {
    try {
        //console.log("searchParams:", searchParams);
        const response = await axios.get('http://localhost:8080/searchTutors/',{ params: searchParams });
        
        const tutorsData = response.data;
        //console.log("tutorsData search API:", tutorsData);
        return tutorsData;
    } catch (error) {
        console.error("Error fetching Search tutors data:", error);
        throw error;
    }
}
export async function fetchTutorProfile ({searchParams}) {
    try {
        //console.log("searchParams in fetchTutorProfile:", searchParams);
        const response = await axios.get('http://localhost:8080/tutorProfile/',{ params: searchParams });
        
        const tutorProfData = response.data;
        //console.log("tutorsData profile API:", tutorProfData);
        return tutorProfData;
    } catch (error) {
        console.error("Error fetching  tutors Profile data:", error);
        throw error;
    }
}