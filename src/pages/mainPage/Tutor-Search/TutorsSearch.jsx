//Bonus Work
import { useEffect, useRef } from "react";
import { useState } from "react";
import Select from "react-select";
import { useSearchParams } from 'react-router-dom';
import NavBar from "../../../ui/NavBar";
import AlternativeNavbar from "../../../ui/AlternativeNavbar";
import './TutorSearch.css';
//import { useTotalTutor } from "../../../services/useTotalTutor";
import ReactSlider from 'react-slider'
import { RiArrowDropDownLine } from "react-icons/ri";
import styled from 'styled-components';
import { Component3 } from "../get-started-page/Component3";
import { Component4 } from "../get-started-page/Component4";
import { MdVerified } from "react-icons/md";
import { SlGraduation } from "react-icons/sl";
import { PiStudentDuotone } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
//import { Backend_URI } from '../../Config/Constant';
import ReactPlayer from 'react-player';
import TutorSearchFooter from "./TutorSearchFooter";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchTutors } from './useSearchTutors';
import SkeletonLoader from './SkeletonLoader';
import { Backend_URI } from '../../../Config/Constant'
import { Modal, Form } from "react-bootstrap";
import ScheduleModal from "./ScheduleModal";
import { useSignin } from "./useSignin";
import axios from "axios";
import EnterCode from "./EnterCode";
 import { useNavigate } from "react-router-dom";

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 25px;
    margin-top: 10px;
    margin-bottom: 30px;
`;

const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
`;

const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => (props.index === 2 ? '#ddd' : props.index === 1 ? '#0f0' : '#ddd')};
    border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

//const ITEMS_PER_PAGE = 5;

const timeArray = ['3-6', '6-9', '9-12', '12-15', '15-18', '18-21', '21-24', '0-3'];
const dayArray = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

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

const allCountries = [
    { value: 'US', label: 'United States of America', flag: 'https://static.preply.com/groot/country_flags/4x3/us.svg' },
    { value: 'IN', label: 'India', flag: 'https://static.preply.com/groot/country_flags/4x3/in.svg' },
    { value: 'GB', label: 'United Kingdom', flag: 'https://static.preply.com/groot/country_flags/4x3/gb.svg' },
    { value: 'CA', label: 'Canada', flag: 'https://static.preply.com/groot/country_flags/4x3/ca.svg' },
    { value: 'AU', label: 'Australia', flag: 'https://static.preply.com/groot/country_flags/4x3/au.svg' },
    { value: 'PK', label: 'Pakistan', flag: 'https://static.preply.com/groot/country_flags/4x3/pk.svg' },
];
function TutorsSearch() {

    const [skeltonloading, setSkeltonLoading] = useState(true);
    const [TutorsArray, setTutorArray] = useState([]);
    const [email, setEmail] = useState('');

    const { mutate } = useSearchTutors(setSkeltonLoading, setTutorArray, email);

    //we will catch subject from backend with the all tutor subject fields

    const [searchQuery, setSearchQuery] = useSearchParams();
    // const { mutate } = useTotalTutor(setTotalTutor, setLoading);
    // const [isLoading, setLoading] = useState(false);
    // const [totalTutor, setTotalTutor] = useState(0);


    const [selectedSubject, setSelectedSubject] = useState();
    const [mySubject, setMySubject] = useState('');


    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: 'none',
            marginTop: '0px',
            // marginBottom: '3px' ,
            height: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: state.isFocused ? 'none' : provided.boxShadow,
        }),

        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            overflow: 'hidden',
            maxHeight: '180px',
        }),
        menuList: (provided) => ({
            ...provided,
            marginBottom: '30px',
            maxHeight: '180px',
            zIndex: 9999,
            overflowY: 'auto',
        }),
        dropdownIndicator: () => ({ display: 'none' }),
        indicatorSeparator: () => ({ display: 'none' }),
        clearIndicator: (provided) => ({
            ...provided,
            display: 'block',
        }),
        option: (provided, state) => ({
            ...provided,

            zIndex: 9999,
            background: state.isSelected ? 'linear-gradient(to top, #3661a0, #57cbf5)' : provided.backgroundColor,
            '&:hover': {
                background: 'linear-gradient(to top, #3661a0, #57cbf5)'
            },

        }),


    };

    const [verifyshowModal, setVerifyshowModal] = useState(false);


    // const handleData = async (e) => {
    //   e.preventDefault();
    //   const concatenatedValue = Object.values(formValues).join("");
    //   console.log("Code Value:", concatenatedValue);
    //   setLoadingstate(true);
    //   const email = localStorage.getItem("email"); // Retrieve email from local storage

    //   try {
    //     const response = await axios.post(
    //       "http://localhost:8080/student/verify",
    //       {
    //         concatenatedValue: concatenatedValue,
    //         email: email, // Include email in the request payload
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     console.log("API Response:", response);
    //     setLoadingstate(false);

    //     if (response.status === 200) {
    //       console.log("email Verification successful");
    //       console.log("API Response:", response.data);
    //       localStorage.setItem("user", JSON.stringify(response.data.user));

    //       navigate("/tutors-search/*");
    //     } else if (response.status === 400) {
    //       console.error("Validation error response:", response.data);

    //       if (response.data && response.data.error) {
    //         setValidationError(response.data.error);
    //       } else {
    //         setValidationError("Invalid Code");
    //       }

    //       console.error("Verification failed with status code:", response.status);
    //     }
    //   } catch (error) {
    //     setLoadingstate(false);
    //     setValidationError("Invalid Code");
    //     console.error("verification error:", error);
    //   }
    // };

    const handleSelectChange = async (selectedOption) => {
        const selectedValue = selectedOption.value;
        setSelectedSubject(selectedOption);
        setMySubject({ subject: selectedValue });
        setSearchQuery({ subject: selectedValue });
    };



    const handleClear = () => {
        setSelectedSubject(null);
        setMySubject('');
    };


    useEffect(() => {

        const subjectFromQuery = searchQuery.get("subject");
        const countryParam = searchQuery.get("Country");
        const timesParam = searchQuery.get("Times");
        const daysParam = searchQuery.get("Days");
        const minPParam = searchQuery.get("minP");
        const maxPParam = searchQuery.get("maxP");

        const isValidSubject = subjects.some(subject => subject.value === subjectFromQuery);

        if (isValidSubject) {
            setMySubject({ subject: searchQuery.get("subject") });
            const selectedSubjectObject = subjects.find(subject => subject.value === subjectFromQuery);
            setSelectedSubject(selectedSubjectObject);
        }

        if (countryParam) {
            const countryArray = countryParam.split('+');
            const isValidCountry = countryArray.every(country => allCountries.some(c => c.value === country));
            if (isValidCountry) {
                setSelectedCountries(countryArray);
            }
        }
        if (timesParam) {
            const time = timesParam.split('+');
            const isValidTimes = time.every(t => timeArray.includes(t));
            if (isValidTimes) {
                setSelectedTimes(time);
            }
        }

        if (daysParam) {
            const day = daysParam.split('+');
            const isValidDays = day.every(d => dayArray.includes(d));
            if (isValidDays) {
                setSelectedDays(day);
            }
        }
        if (minPParam && !isNaN(parseInt(minPParam))) {
            setMinPrice(parseInt(minPParam));
        }

        if (maxPParam && !isNaN(parseInt(maxPParam))) {
            setMaxPrice(parseInt(maxPParam));
        }

    }, [searchQuery]);

    useEffect(() => {
        //console.log("My subject in useEffect:", mySubject);
        if (mySubject) {
            const fetchData = async () => {
                try {
                    handleSearch();

                } catch (error) {
                    console.error("Error in useEffect:", error);
                }

            };

            fetchData();
        }
        setSkeltonLoading(true);
    }, [mySubject]);


    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(100);
    const [isRangeModal, setRangeModal] = useState(false);
    // const navigate = useNavigate();


    const OpenRangeModal = () => {

        setRangeModal(true);
    };

    const closeRangeModal = () => {
        setRangeModal(false);
    };

    const modalRef = useRef();

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeRangeModal();
            closeCountryModal();
            closeAvailableModal();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
    const handleSliderChange = (values) => {
        setMinPrice(values[0]);
        setMaxPrice(values[1]);
    };

    const [isCountryModal, setCountryModal] = useState(false);
    const openCountryModal = () => {
        setCountryModal(true);
    }

    const closeCountryModal = () => {
        setCountryModal(false);
    }

    const [selectedCountries, setSelectedCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [isAvailableModal, setAvailableModal] = useState(false);
    const openAvailableModal = () => {
        setAvailableModal(true);
    }
    const closeAvailableModal = () => {
        setAvailableModal(false);
    }
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);

    const [showMoreIndex, setShowMoreIndex] = useState(null);

    const toggleShowMore = (index) => {
        setShowMoreIndex(index === showMoreIndex ? null : index);
    };
    let content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitaeelit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae.';

    const [hovered, setHovered] = useState(1);
    //const [currentPage, setCurrentPage] = useState(0);
    // const handlePageChange = (selectedPage) => {
    //     setCurrentPage(selectedPage.selected);
    //   };
    //const filteredTutors = [/* Update this array with your filtered tutors based on search criteria */];

    // const pageCount = Math.ceil(filteredTutors.length / ITEMS_PER_PAGE);
    // const offset = currentPage * ITEMS_PER_PAGE;

    // Use slice to get the current page of tutors
    //const currentTutors = filteredTutors.slice(offset, offset + ITEMS_PER_PAGE);
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        const scrollThreshold = 150;

        if (offset > scrollThreshold && !isSticky) {
            setIsSticky(true);
        } else if (offset <= scrollThreshold && isSticky) {
            setIsSticky(false);
        }
    };

    window.onscroll = handleScroll;
    const inputRef = useRef(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const [emailTrue, setEmailTrue] = useState(false);
    const handleSearch = () => {

        if (email.trim() !== '') {
            if (!validateEmail(email)) {
                toast.error("Please enter a valid email address");
                setEmail('');
                document.getElementById('search-by-email').value = '';
                inputRef.current.focus();
                return;
            }
            setEmailTrue(true);
            setSkeltonLoading(true);
            const newSearchParams = {};
            newSearchParams.email = email;
            setSearchQuery(newSearchParams);
            mutate({ searchParams: newSearchParams });

            setEmail('');
            document.getElementById('search-by-email').value = '';
        }
        else {
            setSkeltonLoading(true);
            if (!selectedSubject) {
                toast.error("Please select a subject or search by email");
                setSkeltonLoading(false);
                return;
            }

            const newSearchParams = {};

            newSearchParams.subject = mySubject.subject;


            if (selectedTimes.length > 0) {
                const formattedTimes = selectedTimes.join('+');
                newSearchParams.Times = formattedTimes;
            }

            if (selectedDays.length > 0) {
                const formattedDays = selectedDays.join('+');
                newSearchParams.Days = formattedDays;
            }

            if (selectedCountries.length > 0) {
                const formattedCountry = selectedCountries.join('+');
                newSearchParams.Country = formattedCountry;
            }

            if (minPrice !== null && maxPrice !== null) {
                newSearchParams.minP = minPrice;
                newSearchParams.maxP = maxPrice;
            }

            setSearchQuery(newSearchParams);

            mutate({ searchParams: newSearchParams });

        }

    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpStudentName, setSignUpStudentName] = useState('');
    const [signUpStudentEmail, setSignUpStudentEmail] = useState('');
    const [signUpStudentPassword, setSignUpStudentPassword] = useState('');
    const [SignUpshowModal, setSignUpShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showScheduleModal, setCloseScheduleModal] = useState(false);
    const handleCloseVerifyModal = () => setVerifyshowModal(false);

    const handleShowScheduleModal = () => {
        setCloseScheduleModal(true);
        setVerifyshowModal(false);

        if (showLoginModal) {
            setShowLoginModal(false);
        }
        if (SignUpshowModal) {
            setSignUpShowModal(false);
        }
    }
    const handleCloseScheduleModal = () => setCloseScheduleModal(false);
    const handleShowVerifyModal = () => setVerifyshowModal(true);

    const handleShowSignUpModal = () => {
        setSignUpShowModal(true);
        if (showLoginModal) {

            setShowLoginModal(false)
        }
    }

    const handleCloseSignUpModal = () => {
        setSignUpShowModal(false);
        setSignUpEmail('');
        setSignUpPassword('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, studentemail, studentpassword } = event.target.elements;

        try {
            // Make a POST request to the backend
            const response = await axios.post(
                "http://localhost:8080/student/signup",
                {
                    name: name.value,
                    email: studentemail.value,
                    password: studentpassword.value,
                }
            );

            console.log("Response from backend:", response.data);

            if (response.status === 200) {
                // Show success toast and navigate to verify page
                toast.success("Verification code sent on email");
                localStorage.setItem("email", studentemail.value);
                setSignUpShowModal(false);
                setSignUpStudentEmail('');
                setSignUpStudentPassword('');
                setSignUpStudentName('');
                setVerifyshowModal(true);
            }
        } catch (error) {
            if (error.response.status === 409) {
                // Show toast message for already registered as a student
                toast.error("User already registered");
                console.log("User already registered");
            }
            else if (error.response.status === 400) {
                // Show toast message for already registered as a teacher
                toast.error("This email is already registered as a teacher");
                console.log("Email already registered as teacher");
            }
            else if (error.response.status === 401) {
                // Show toast message for already registered as a teacher
                toast.error("Password must be at least 8 characters long and contain at least one capital letter and one special character.");
                console.log("Email already registered as teacher");
            }
        }
    };

    const handleShowLoginModal = () => {
        if (SignUpshowModal) {
            setSignUpShowModal(false);
        }
        setShowLoginModal(true);
    }
    const handleCloseLoginModal = () => setShowLoginModal(false);
    const { mutate: login } = useSignin({ setSignUpEmail, setSignUpPassword, handleShowScheduleModal });
    const verified = JSON.parse(localStorage.getItem("verified"));

   // const token = localStorage.getItem('token');
    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        setShowLoginModal(false);
        login({ studentemail: email.value, studentpassword: password.value, handleShowVerifyModal })
            .catch((error) => {
                console.error("Mutation failed:", error);
            });
    };
    const navigate = useNavigate();
    const handleOpenChat = async (teacherId)=>{
        const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const studentId = userData._id;
        try {
            setSkeltonLoading(true);
            const response = await fetch('http://localhost:8080/createConversation', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ teacherId, studentId }),
            });
      
            if (response.ok) {
              const data = await response.json();
              // Assuming the conversation ID is returned in the response
              const conversationId = data._id;
              // Navigate to the chat page with the conversation ID
                navigate(`/studentdashboard/chat/${conversationId}`);

            } 
          } catch (error) {
            toast.error('Error creating conversation:',error);

            console.error('Error creating conversation:', error);
          } finally {
            setSkeltonLoading(false);
          }
    }

    return (
        <>
            <ToastContainer />
            <div className="CovertNavStatic">
            {verified &&  verified != 'null' ? <AlternativeNavbar currentImageIndex={0} /> :
                    <NavBar currentImageIndex={0} />
                }
            </div>

            <div>
                <h1 style={{ margin: "10px 10px", marginLeft: "20px" }}>
                    Online {mySubject.subject} tutors & teachers for private lessons

                </h1>
            </div>
            <div
                className={`tutor-searchNav-container container-fluid ${isSticky ? 'sticky' : ''}`}
                style={{
                    top: '0',
                    zIndex: '100',
                    background: isSticky
                        ? 'linear-gradient(to bottom, #ffffff, #f8f8f8)'
                        : 'white',
                    padding: '1rem',
                    position: 'sticky',
                    boxShadow: isSticky
                        ? '0 2px 10px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.15)'
                        : 'none',
                    borderRadius: '0px 0px 10px 10px',
                    transition: 'background 0.3s ease, box-shadow 0.3s ease',
                }}
            >
                <div className="row gap-2 searchNav" style={{ marginLeft: '5px' }}>
                    <div className="col-3 myCustomStyle" >
                        <small style={{ marginLeft: '10px' }}>I want to learn</small>
                        <div >
                            <Select
                                id="subject"
                                value={selectedSubject}
                                onChange={handleSelectChange}
                                options={subjects}
                                placeholder="Subject"
                                styles={customStyles}
                                onClearValue={handleClear}
                                isClearable
                            />
                        </div>
                    </div>
                    <div className="col-2 myCustomStyle" onClick={OpenRangeModal}>
                        <small style={{ marginLeft: '10px' }}>Price per lesson</small>
                        <div className="row" style={{ marginLeft: '0px', marginTop: '5px' }}>
                            <div className="col-9" style={{ fontWeight: 'bold' }}>
                                {`$ ${minPrice} - $ ${maxPrice}`}
                            </div>
                            <div className="col-3">
                                <RiArrowDropDownLine style={{ fontSize: '28px' }} />
                            </div>
                            {isRangeModal && (
                                <div className="custom-modal-overlay" >
                                    <div className="custom-modal" ref={modalRef}>
                                        <div className="values" style={{ margin: '33px', marginBottom: '10px', marginLeft: '50px', fontWeight: 'bold', fontSize: '18px' }}>
                                            {`$ ${minPrice} - $ ${maxPrice}`}
                                        </div>
                                        <StyledSlider
                                            defaultValue={[minPrice, maxPrice]}
                                            renderTrack={Track}
                                            renderThumb={Thumb}
                                            pearling
                                            minDistance={1}
                                            onChange={handleSliderChange}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-3 myCustomStyle" onClick={openCountryModal} >
                        <small style={{ marginLeft: '10px' }}>Country of birth</small>
                        <div className="row" style={{ marginLeft: '0px', marginTop: '5px' }}>
                            <div className="col-10" style={{ fontWeight: 'bold' }}>
                                {selectedCountries.length > 0 ? selectedCountries : "Any Country"}
                            </div>
                            <div className="col-2">
                                <RiArrowDropDownLine style={{ fontSize: '28px' }} />
                            </div>
                            {isCountryModal && (
                                <div className="custom-modal-overlay" style={{ height: '300px', overflowY: 'auto', paddingTop: "15px", paddingBottom: "15px" }} ref={modalRef}>
                                    <Component3 searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchResults={searchResults} setSearchResults={setSearchResults} selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} />

                                </div>

                            )}
                        </div>
                    </div>
                    <div className="col-3 myCustomStyle" onClick={openAvailableModal}>
                        <small style={{ marginLeft: '10px' }}>I m available</small>
                        <div className="row" style={{ marginLeft: '0px', marginTop: '5px' }}>
                            <div className="col-10" style={{ fontWeight: 'bold' }}>
                                {selectedTimes.length > 0 ? selectedDays.length > 0 ? selectedDays + " " + selectedTimes : selectedTimes : selectedDays.length > 0 ? selectedDays : "Any time"}
                            </div>
                            <div className="col-2">
                                <RiArrowDropDownLine style={{ fontSize: '28px' }} />
                            </div>
                            {isAvailableModal && (
                                <div className="custom-modal-overlay" ref={modalRef} style={{ height: '300px', overflowY: 'auto', paddingTop: "15px", paddingBottom: "15px" }}>
                                    <Component4 selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row gap-2 searchNav" style={{ marginLeft: '5px', marginTop: '10px' }}>
                    <div className="col-4 myCustomStyle" style={{ height: '50px', display: 'flex', alignItems: 'center' }} onClick={handleClick}>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%', background: isSticky ? 'linear-gradient(rgb(255, 255, 255), rgb(248, 248, 248))' : 'white' }}>
                            <span style={{ margin: '10px' }}>
                                <IoSearch />
                            </span>
                            <span style={{ width: '100%', height: '100%' }}>
                                <input id="search-by-email" onChange={(e) => setEmail(e.target.value)} ref={inputRef} type="text" name="search" placeholder="Search by email" style={{ width: '100%', height: '100%', border: 'none', outline: 'none', background: isSticky ? 'linear-gradient(rgb(255, 255, 255), rgb(248, 248, 248))' : 'white', padding: '2px 0' }} />
                            </span>
                        </div>
                    </div>
                    <div className="col-2" style={{ marginTop: '2px' }}>

                        <button className="Tutor-Search-Button" onClick={handleSearch} >Search</button>
                    </div>



                </div>

            </div>
            <main>
                {skeltonloading ? (<SkeletonLoader />) : (
                    <>
                        <div className="row" style={{ padding: '5px', marginLeft: '20px', fontWeight: 'bold', fontSize: '20px' }}>
                            {TutorsArray.length} {mySubject.subject} tutors available
                        </div>
                        {TutorsArray.length > 0 ? (

                            TutorsArray.map((index) => (
                                <div key={index} className="row" style={{ marginLeft: '5px' }}>
                                    <div className="col-8 prof">
                                        <div
                                            className={`row ${hovered === index ? 'hov' : ''}`}
                                            onMouseEnter={() => setHovered(index)}
                                            style={{
                                                marginLeft: '10px',
                                                border: hovered === index ? '2px solid black' : '2px solid #ccc',
                                                padding: '20px',
                                                borderRadius: '5px',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            <div className={` col-2`}>
                                                <a href={`/tutor?id=${index._id}`} target="_blank" rel="noopener noreferrer">
                                                    <img src={index.profilePhoto ? `${Backend_URI}/${index.profilePhoto}` : 'UserDpNotFound.jpg'} alt="userProfile" style={{ margin: 'auto', borderRadius: '10% 1%' }} height={150} width={120} onError={(e) => {
                                                        e.target.src = `./UserDpNotFound.jpg`;
                                                        e.target.style.border = '1px solid #ccc';
                                                    }} />
                                                </a>
                                            </div>
                                            <div className="col-6 mx-4">
                                                <div className="row" style={{ fontWeight: 'bold', paddingLeft: '10px', marginBottom: '10px' }}>

                                                    <a className="col-3" href={`/tutor?id=${index._id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'black', display: 'inline' }}>
                                                        {index.firstName} {index.lastName}
                                                    </a>
                                                    <div className="col-1">
                                                        <MdVerified style={{ display: 'inline', color: 'green' }} />
                                                    </div>
                                                </div>

                                                <div className="row" style={{ marginBottom: '10px' }}>
                                                    <span className="col-4" style={{ marginLeft: '10px', padding: '5px', paddingLeft: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
                                                        Super Tutor
                                                    </span>
                                                </div>
                                                <div className="row" style={{ marginBottom: '10px' }}>
                                                    <div className="col-1">
                                                        <SlGraduation />
                                                    </div>
                                                    Your Tutor
                                                </div>
                                                <div className="row" style={{ marginBottom: '10px' }}>
                                                    <div className="col-1">
                                                        <PiStudentDuotone />
                                                    </div>
                                                    1 lessons
                                                </div>
                                                <div className="row" style={{ whiteSpace: 'pre-line' }}>
                                                    <p>
                                                        {(() => {
                                                            let newContent = '';
                                                            if (index.profileDescription) {
                                                                newContent += index.profileDescription.introduceYourself + '\n\n';
                                                                newContent += index.profileDescription.motivateStudents + '\n\n';
                                                                newContent += index.profileDescription.teachingExperience;
                                                                content = newContent;
                                                            }
                                                            return (
                                                                <>
                                                                    {content.length > 100 ? (
                                                                        <>
                                                                            {showMoreIndex === index ? newContent : `${newContent.slice(0, 100)}...`}
                                                                            <div onClick={() => toggleShowMore(index)} style={{ fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
                                                                                {showMoreIndex === index ? ' Hide Details' : ' Read more'}
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        newContent
                                                                    )}
                                                                </>
                                                            );
                                                        })()}
                                                    </p>
                                                </div>

                                            </div>
                                            <div className="col-3">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <div style={{ fontWeight: 'bold' }}>New</div>
                                                        <div> tutor</div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div style={{ fontWeight: 'bold' }}>$ {index.hourlyPriceUSD}</div>
                                                        <div> 50-min lesson</div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                {verified &&  verified != 'null' ?
                                                        <button className="btn" onClick={handleShowScheduleModal} style={{ fontWeight: 'bold', background: 'linear-gradient(to top, #3661a0, #57cbf5)', border: '2px solid black', marginTop: '6.5rem', padding: '8px', borderRadius: '10px', width: '110%' }}>
                                                            Book a trial
                                                        </button> :
                                                        <button className="btn" onClick={handleShowSignUpModal} style={{ fontWeight: 'bold', background: 'linear-gradient(to top, #3661a0, #57cbf5)', border: '2px solid black', marginTop: '6.5rem', padding: '8px', borderRadius: '10px', width: '110%' }}>
                                                            Book a trial
                                                        </button>
                                                    }


                                                    <Modal size="lg" style={{
                                                        maxHeight: '70vh', // Adjust as needed
                                                        width: '70%', // Adjust as needed
                                                        overflow: 'hidden',
                                                        position: 'fixed',
                                                        left: '50%',
                                                        top: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                    }} show={verifyshowModal} onHide={handleCloseVerifyModal} >
                                                        <Modal.Body>
                                                            <EnterCode handleShowScheduleModal={handleShowScheduleModal} />
                                                        </Modal.Body>
                                                    </Modal>
                                                    <Modal show={SignUpshowModal} onHide={handleCloseSignUpModal} centered className="modal-signup">

                                                        <Modal.Body>
                                                            <div className="modal-auth-content">
                                                                <img src={index.profilePhoto ? `${Backend_URI}/${index.profilePhoto}` : 'UserDpNotFound.jpg'} alt="userProfile" style={{ margin: 'auto', borderRadius: '10% 1%' }} height={100} width={90} onError={(e) => {
                                                                    e.target.src = `./UserDpNotFound.jpg`;
                                                                    e.target.style.border = '1px solid #ccc';

                                                                }} />
                                                                <h4>
                                                                    Sign up to start learning
                                                                </h4>
                                                                <span>
                                                                    <small>
                                                                        Only one step left to book your lesson with
                                                                        &nbsp;{index.firstName} {index.lastName}
                                                                    </small>
                                                                </span>
                                                            </div>

                                                            <button className="google-signup-btn" >
                                                                <img src="/google-icon.png" alt="Google Icon" className="google-icon" />
                                                                Continue with Google
                                                            </button>

                                                            <Form onSubmit={handleSubmit}>
                                                                <Form.Group controlId="name">
                                                                    <Form.Label>Name</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        className="w-100"
                                                                        placeholder="Enter name"
                                                                        value={signUpStudentName}
                                                                        onChange={(e) => setSignUpStudentName(e.target.value)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group controlId="studentemail">
                                                                    <Form.Label>Email</Form.Label>
                                                                    <Form.Control
                                                                        type="email"
                                                                        className="w-100"
                                                                        placeholder="Enter email"
                                                                        value={signUpStudentEmail}
                                                                        onChange={(e) => setSignUpStudentEmail(e.target.value)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group controlId="studentpassword">
                                                                    <Form.Label>Password</Form.Label>
                                                                    <Form.Control
                                                                        type="password"
                                                                        className="w-100"
                                                                        placeholder="Enter password"
                                                                        value={signUpStudentPassword}
                                                                        onChange={(e) => setSignUpStudentPassword(e.target.value)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                                <button type="submit" className="google-signup-btn" style={{ background: 'linear-gradient(to top, #3661a0, #57cbf5)', marginTop: '10px' }}>
                                                                    Submit
                                                                </button>
                                                            </Form>
                                                            <div className="modal-auth-content">
                                                                <small>

                                                                    By clicking Continue or Sign up, you agree to <span style={{ fontWeight: "bold", textDecoration: "underline" }}>Terms of Use</span>, including <span style={{ fontWeight: "bold", textDecoration: "underline" }}>Subscription Terms</span> and <span style={{ fontWeight: "bold", textDecoration: "underline" }}>Privacy Policy</span>.
                                                                </small>
                                                            </div>
                                                            <div className="modal-auth-footer">
                                                                <span>Already have an account?</span>
                                                                <button onClick={handleShowLoginModal} className="modal-auth-footer-login-btn">Login</button>
                                                            </div>
                                                        </Modal.Body>
                                                    </Modal>
                                                    <Modal show={showLoginModal} onHide={handleCloseLoginModal} centered className="modal-login">
                                                        <Modal.Body>
                                                            <div className="modal-auth-content">

                                                                <h4>
                                                                    Log in to start learning
                                                                </h4>
                                                                <div className="modal-auth-footer" style={{ border: 'none' }}>
                                                                    <span>Don&quot;t have a account?</span>
                                                                    <button className="modal-auth-footer-login-btn" onClick={handleShowSignUpModal}>Sign up</button>
                                                                </div>

                                                            </div>

                                                            <button className="google-signup-btn" >
                                                                <img src="/google-icon.png" alt="Google Icon" className="google-icon" />
                                                                Continue with Google
                                                            </button>

                                                            <Form onSubmit={handleLogin}>
                                                                <Form.Group controlId="email">
                                                                    <Form.Label>Email</Form.Label>
                                                                    <Form.Control
                                                                        type="email"
                                                                        className="w-100"
                                                                        placeholder="Enter email"
                                                                        value={signUpEmail}
                                                                        onChange={(e) => setSignUpEmail(e.target.value)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group controlId="password">
                                                                    <Form.Label>Password</Form.Label>
                                                                    <Form.Control
                                                                        type="password"
                                                                        className="w-100"
                                                                        placeholder="Enter password"
                                                                        value={signUpPassword}
                                                                        onChange={(e) => setSignUpPassword(e.target.value)}
                                                                        required
                                                                    />
                                                                </Form.Group>
                                                                <button type="submit" className="google-signup-btn" style={{ background: 'linear-gradient(to top, #3661a0, #57cbf5)', marginTop: '10px' }}>
                                                                    Login
                                                                </button>
                                                            </Form>

                                                        </Modal.Body>
                                                    </Modal>

                                                    <ScheduleModal availability={index.availability} showScheduleModal={showScheduleModal} handleCloseScheduleModal={handleCloseScheduleModal} profilePhoto={index.profilePhoto} tutorProfileData={index} />
                                                </div>

                                                <div className="row">
                                                    {verified &&  verified != 'null' ?
                                                        <button onClick={()=>handleOpenChat(index._id)} className="btn hov-btn" style={{ background: 'white', border: '2px solid #ccc', marginTop: '1rem', padding: '8px', borderRadius: '10px', width: '110%' }}>
                                                            Send Message
                                                        </button>
                                                        :
                                                        <button onClick={handleShowSignUpModal} className="btn hov-btn" style={{ background: 'white', border: '2px solid #ccc', marginTop: '1rem', padding: '8px', borderRadius: '10px', width: '110%' }}>
                                                            Send Message
                                                        </button>
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {hovered == index && (
                                        <div className="col-4 vid">
                                            <div className="row" style={{ width: '90%', marginLeft: '18px', padding: '2px' }}>
                                                <ReactPlayer
                                                    style={{ border: '2px solid black', borderRadius: '5px', padding: 0 }}
                                                    // url={`${Backend_URI}/${index.video.data}`}
                                                    controls
                                                    height={230}
                                                    width={350}
                                                    onError={() => {
                                                        console.log('Video loading error');


                                                    }}
                                                    config={{
                                                        file: {
                                                            attributes: {
                                                                //poster: `${Backend_URI}/${index.video.thumbnail}`
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="row">
                                                <a href={`/tutor?id=${index._id}&sc=true`} target="_blank" rel="noopener noreferrer">
                                                    <button className="btn hov-btn" style={{ background: 'white', border: '2px solid black', marginLeft: '1.8rem', marginTop: '1rem', padding: '8px', borderRadius: '10px', width: '80%' }}>
                                                        View full schedule
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : emailTrue ? (<div className="row">
                            <div className="col-5" style={{ margin: 'auto' }}>
                                <p>
                                    <h3>
                                        Looks searched email: &quot;{searchQuery.get("email")}&quot;  can’t find any matches
                                    </h3>

                                </p>
                                <p>Try removing some filters to see your top tutors</p>
                            </div>
                            <div className="col-4">
                                <img src="./NotFound.jpg" alt="Not_Found_Pic" height={300} width={300} />
                            </div>
                        </div>) : (
                            <div className="row" >
                                <div className="col-5" style={{ margin: 'auto' }}>
                                    <p>
                                        <h3>
                                            Looks like we can’t find any matches
                                        </h3>

                                    </p>
                                    <p>Try removing some filters to see your top tutors</p>
                                </div>
                                <div className="col-4">
                                    <img src="./NotFound.jpg" alt="Not_Found_Pic" height={300} width={300} />
                                </div>
                            </div>
                        )
                        }
                    </>
                )}

            </main>



            {!SkeletonLoader &&
                <div className="pagination-container">

                    <ReactPaginate
                        pageCount={25}
                        //onPageChange={handlePageChange}
                        containerClassName="pagination"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        activeClassName="active"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        previousLabel="< previous"
                        nextLabel="next >"
                        breakLabel="..."
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                    />
                </div>
            }

            <TutorSearchFooter />
        </>
    );
}

export default TutorsSearch