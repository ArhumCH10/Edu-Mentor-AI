//Bonus Work
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { useSearchParams } from 'react-router-dom';
import NavBar from "../../../ui/NavBar";
//import { useTotalTutor } from "../../../services/useTotalTutor";



const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: 'none',
        marginTop: '0px' ,
        marginBottom: '3px' ,
        boxShadow: state.isFocused ? 'none' : provided.boxShadow,
    }),
 
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,  
        overflowY: 'hidden',
    }),
    menuList: (provided) => ({
        ...provided,
        maxHeight: '180px',
        // Hide the scroll bar
    }),
    indicatorsContainer: () => ({
        display: 'none', 
    }),
    option: (provided, state) => ({
        ...provided,
        zIndex: 9999,  
        backgroundColor: state.isSelected ?'linear-gradient(to top, #3661a0, #57cbf5)' : provided.backgroundColor,
        '&:hover': {
            background: 'linear-gradient(to top, #3661a0, #57cbf5)'
        },
    }),
};


function TutorsSearch() {
    const tutor = 'English';
     //we will catch subject from backend with the all tutor subject fields
     const subjects = [
        { value: "maths", label: "Math" },
        { value: "science", label: "Science" },
        { value: "English", label: "English" },
        { value: "Urdu", label: "Urdu" },
        { value: "Computer Science", label: "Computer Science" },
        { value: "Computer Science", label: "Computer Science" },
        { value: "Computer Science", label: "Computer Science" },
        { value: "Computer Science", label: "Computer Science" },
        { value: "Computer Science", label: "Computer Science" },
    ];
    const [searchQuery, setSearchQuery] = useSearchParams();
    // const { mutate } = useTotalTutor(setTotalTutor, setLoading);
    // const [isLoading, setLoading] = useState(false);
    // const [totalTutor, setTotalTutor] = useState(0);


    const [selectedSubject, setSelectedSubject] = useState();
    const [mySubject, setMySubject] = useState('');
    const handleSelectChange = async (selectedOption) => {
        const selectedValue = selectedOption.value;
        setSelectedSubject(selectedOption);
        setMySubject({ subject: selectedValue });
        setSearchQuery({ subject: selectedValue });
    };

    useEffect(() => {

        const subjectFromQuery = searchQuery.get("subject");
        const isValidSubject = subjects.some(subject => subject.value === subjectFromQuery);
        if (isValidSubject) {
            setMySubject({ subject: searchQuery.get("subject") });
            const selectedSubjectObject = subjects.find(subject => subject.value === subjectFromQuery);
            setSelectedSubject(selectedSubjectObject);
            
        }
    }, []);

    useEffect(() => {
        //console.log("My subject in useEffect:", mySubject);
        if (mySubject) {
            const fetchData = async () => {
                try {
                   // mutate(mySubject)

                } catch (error) {
                    console.error("Error in useEffect:", error);
                }

            };

            fetchData();
        }
    }, [mySubject]);

    return (
        <>
            <NavBar currentImageIndex={0} />
            <div>
                <h1 style={{ margin: "10px 10px" }}>
                    Online {tutor} tutors & teachers for private lessons

                </h1>
            </div>
            <div className="container-fluid">
                <div className="row gap-2">
                    <div className="col-3" style={{height:'80px',widows:'100%', padding:'10px',border:'2px solid #ccc',borderRadius: '8px', marginLeft:'10px'}}>
                        <small style={{marginLeft:'10px'}}>I want to learn</small>
                        <Select
                            id="subject"
                            value={selectedSubject}
                            onChange={handleSelectChange}
                            options={subjects}
                            placeholder="Subject"
                            styles={customStyles}
                            
                        />
                    </div>
                    <div className="col-3"  style={{height:'78', padding:'10px',border:'2px solid #ccc',borderRadius: '8px', marginLeft:'10px'}}>

                    </div>
                    <div className="col-3"  style={{height:'75', padding:'10px',border:'2px solid #ccc',borderRadius: '8px', marginLeft:'10px'}}>

                    </div>
                    <div className="col-2"  style={{height:'75', padding:'10px',border:'2px solid #ccc',borderRadius: '8px', marginLeft:'10px'}}>

                    </div>
                </div>
            </div>
        </>
    );
}

export default TutorsSearch