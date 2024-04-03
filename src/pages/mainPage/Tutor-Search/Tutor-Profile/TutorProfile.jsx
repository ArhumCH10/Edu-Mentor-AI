import { useState, useRef, useEffect } from "react";
import NavBar from "../../../../ui/NavBar";
import { MdVerified } from "react-icons/md";
import { SlGraduation } from "react-icons/sl";
import { PiStudentDuotone } from "react-icons/pi";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from 'react-player';
import { HiBolt } from "react-icons/hi2";
import { BiMessageSquareDetail } from "react-icons/bi";
import { LuClock3 } from "react-icons/lu";
import TutorSearchFooter from "../TutorSearchFooter";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { useTutorProfile } from './useTutorProfile'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Spinner from '../../../TeacherSignUpProcess/startSpinner'
import { Backend_URI } from '../../../../Config/Constant'
import { Modal, Form } from "react-bootstrap";
import ScheduleModal  from "../ScheduleModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSignin } from "../useSignin";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const localizer = momentLocalizer(moment);
import './TutorProfile.css';
import AlternativeNavbar from "../../../../ui/AlternativeNavbar";


const useStyles = makeStyles(() => ({
    tabs: {
        marginLeft: '70px',
        backgroundColor: "white",
    },
    tab: {
        marginLeft: '0px',
        marginRight: "0px",
        marginTop: "1em",
        borderBottom: "2px solid transparent",
        fontWeight: "bold",
        color: "black",
        width: '20px',
        "&:hover": {
            borderBottomColor: "skyblue",

        },
    },
    stickyAppBar: {

        position: "sticky",
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #ccc",
        zIndex: 1000,
    },
}));

//const localizer = momentLocalizer(moment);


const TutorProfile = () => {
    const [tutorProfileData, setTutorProfileData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const { mutate } = useTutorProfile(setTutorProfileData, setIsLoading);
    const aboutRef = useRef(null);
    const scheduleRef = useRef(null);
    const resumeRef = useRef(null);
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const [tabs, setTabs] = useState([]);
    const [ResumeTabs, setResumeTabs] = useState([]);
    const [resumeTabValue, setResumeTabValue] = useState(0);
    const [activeResumeTab, setActiveResumeTab] = useState(ResumeTabs[0]);
    const [events, setEvents] = useState([]);

    const [searchQuery] = useSearchParams();

    const [loadingState, setLoadingstate] = useState(false);
    const [validationError, setValidationError] = useState("");
    const [verifyshowModal, setVerifyshowModal] = useState(false);
  
    const [formValues, setFormValues] = useState({
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    });
  
    const inputRefs = {
      code1: useRef(null),
      code2: useRef(null),
      code3: useRef(null),
      code4: useRef(null),
      code5: useRef(null),
      code6: useRef(null),
    };
  
    const handleInputChange = (e, inputName) => {
      const { value } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [inputName]: value,
      }));
  
      // Focus on the next input field if there is one
      const currentIndex = Number(inputName.charAt(inputName.length - 1));
      if (currentIndex < 6) {
        const nextInputName = `code${currentIndex + 1}`;
        inputRefs[nextInputName].current.focus();
      }
    };
  
    const handleData = async (e) => {
      e.preventDefault();
      const concatenatedValue = Object.values(formValues).join("");
      console.log("Code Value:", concatenatedValue);
      setLoadingstate(true);
      const email = localStorage.getItem("email"); // Retrieve email from local storage
  
      try {
        const response = await axios.post(
          "http://localhost:8080/student/verify",
          {
            concatenatedValue: concatenatedValue,
            email: email, // Include email in the request payload
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("API Response:", response);
        setLoadingstate(false);
  
        if (response.status === 200) {
          console.log("email Verification successful");
          console.log("API Response:", response.data);
          localStorage.setItem("user", JSON.stringify(response.data.user));
  
          navigate("/tutors-search/*");
        } else if (response.status === 400) {
          console.error("Validation error response:", response.data);
  
          if (response.data && response.data.error) {
            setValidationError(response.data.error);
          } else {
            setValidationError("Invalid Code");
          }
  
          console.error("Verification failed with status code:", response.status);
        }
      } catch (error) {
        setLoadingstate(false);
        setValidationError("Invalid Code");
        console.error("verification error:", error);
      }
    };

    let content = ` Hello there! I'm AutoBot`;

    const handleChange = (event, newValue) => {
        setValue(newValue);

        if (newValue === 0) {
            scrollToRef(aboutRef);
        } else if (newValue === 1) {
            scrollToRef(scheduleRef);
        } else if (newValue === 2) {
            scrollToRef(resumeRef);
        }
    };

    const scrollToRef = (ref) => {
        const headerHeight = 50;
        window.scrollTo({
            top: ref.current.offsetTop - headerHeight,
            behavior: "smooth",
        });
    };
    const handleResumeTabChange = (event, newValue) => {
        setResumeTabValue(newValue);
        setActiveResumeTab(ResumeTabs[newValue]);

    };

    const [showMoreIndex, setShowMoreIndex] = useState(false);

    const toggleShowMore = () => {
        setShowMoreIndex(!showMoreIndex);
    };

    const [educations, setEducations] = useState([]);
    const [certificates, setCertificates] = useState([]);

    const renderResumeContent = () => {
        switch (activeResumeTab) {
            case 'Education':
                return (
                    <div className='Resume-content' style={{ height: 'auto' }}>

                        {educations.map((edu, index) => {
                            return (
                                <div key={index} className="row">
                                    <div className="col-3">
                                        {`${edu.yearsOfStudyFrom} - ${edu.yearsOfStudyTo || '2024'}`}
                                    </div>
                                    <div className="col-9">
                                        <div className="row">{edu.university}</div>
                                        <div className="row" style={{ marginLeft: '-22px' }}><small>{`${edu.degree} in ${edu.degreeType}`}</small></div>
                                        {edu.educationPhoto ?
                                            (<div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'green' }}><RiVerifiedBadgeFill style={{ marginTop: '-5px' }} /> Education Verified</small></div>) :
                                            (<div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'red' }}><TiDelete style={{ marginLeft: '-5px', marginTop: '-5px', fontSize: '1.1rem' }} /> Education Not Verified</small></div>)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            case 'Certification':
                return (
                    <div className='Resume-content' style={{ height: 'auto' }}>
                        {certificates.map((cert, index) => {
                            return (
                                <div key={index} className="row">
                                    <div className="col-3">
                                        {`${cert.yearsOfStudyFrom} - ${cert.yearsOfStudyTo || '2024'}`}
                                    </div>
                                    <div className="col-9">
                                        <div className="row">{cert.subject}</div>
                                        <div className="row" style={{ marginLeft: '-22px' }}><small>{`${cert.certificate} By ${cert.issuedBy}`}</small></div>
                                        {cert.certificationPhoto ?
                                            (<div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'green' }}><RiVerifiedBadgeFill style={{ marginTop: '-5px' }} /> Certificate Verified</small></div>) :
                                            (<div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'red' }}><TiDelete style={{ marginLeft: '-5px', marginTop: '-5px', fontSize: '1.1rem' }} /> Certificate Not Verified</small></div>)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            default:
                return null;
        }
    };

    const currentDate = new Date();

    const [event] = useState([

        {
            start: new Date(currentDate.getTime() + 3 * 60 * 60 * 1000),
            end: new Date(currentDate.getTime() + 5 * 60 * 60 * 1000),
        },
        {
            start: new Date(currentDate.getTime() + 6 * 60 * 60 * 1000),
            end: new Date(currentDate.getTime() + 7 * 60 * 60 * 1000),
        },
    ]);

    const [date, setDate] = useState(new Date());

    const onNavigate = (newDate) => {
        setDate(newDate);
    };

    useEffect(() => {
        const removeUnnecessary = () => {
            const allDayCell = document.querySelector('.rbc-allday-cell');
            const alltimegutter = document.querySelector('.rbc-time-gutter');
            const allrbcEventContent = document.querySelectorAll('.rbc-event-content');
            if (allDayCell) {
                allDayCell.remove();
            }
            if (alltimegutter) {
                alltimegutter.remove();
            }

            if (allrbcEventContent) {
                allrbcEventContent.forEach((element) => {
                    element.remove();
                });
            }

        };
        const adjustHeight = () => {
            const rbcEvent = document.querySelector('.rbc-event');
            if (rbcEvent && !isLoading) {
                rbcEvent.style.height = 'auto';
            }
        };
        const timeout = setTimeout(() => {
            if (!isLoading) {
                removeUnnecessary();
                adjustHeight();
            }
        }, 2000);
        return () => clearTimeout(timeout);
    }, [isLoading]);

    const [id, setId] = useState();
    useEffect(() => {

        const Id = searchQuery.get("id");
        console.log("Id", Id);
        setId(Id);


    }, [searchQuery]);

    useEffect(() => {
        if (id) {
            const newSearchParams = {};
            newSearchParams.id = id;
            mutate({ searchParams: newSearchParams });

        }

    }, [id])

    useEffect(() => {
        if (isLoading === false && tutorProfileData) {
            const scParam = searchQuery.get('sc');
            if (scParam && tabs.includes("Schedule")) {
                setValue(1);
                scrollToRef(scheduleRef);
            }
        }
    }, [isLoading, tutorProfileData, searchQuery, tabs]);

    useEffect(() => {
        const generateEvents = () => {
            const newEvents = [];
            const today = moment();
            const twoMonthsLater = moment().add(2, 'months');
    
            const datesUntilTwoMonthsLater = [];
            while (today.isBefore(twoMonthsLater)) {
                datesUntilTwoMonthsLater.push(today.clone());
                today.add(1, 'week');
            }
    
            datesUntilTwoMonthsLater.forEach(date => {
                tutorProfileData.availability.forEach(day => {
                    const dayOfWeek = date.clone().day(day.day);
                    day.slots.forEach(slot => {
                        const startDateTime = dayOfWeek.clone().set({
                            hour: parseInt(slot.from.split(':')[0]),
                            minute: parseInt(slot.from.split(':')[1]),
                        });
                        const endDateTime = dayOfWeek.clone().set({
                            hour: parseInt(slot.to.split(':')[0]),
                            minute: parseInt(slot.to.split(':')[1]),
                        });

                        if (startDateTime.isSameOrAfter(moment(), 'day')) {
                            newEvents.push({
                                start: startDateTime.toDate(),
                                end: endDateTime.toDate(),
                               // title: `${startDateTime.format('LT')} – ${endDateTime.format('LT')}`,
                            });
                        }
                    });
                });
            });
    
            setEvents(newEvents);
        };

        if (tutorProfileData) {
            console.log("tutorProfileData", tutorProfileData);
            const newTabs = [];
            const newResumeTabs = [];

            if (tutorProfileData.profileDescription) {
                newTabs.push("About");
            }

            if (tutorProfileData.availability) {
                newTabs.push("Schedule");
                generateEvents();
            }

            if (tutorProfileData.educations || tutorProfileData.certifications) {
                newTabs.push("Resume");
                if (tutorProfileData.educations) {
                    newResumeTabs.push("Education");
                    const { educations } = tutorProfileData;
                    setEducations(educations);

                }
                if (tutorProfileData.certifications) {
                    newResumeTabs.push("Certification");
                    const { certifications } = tutorProfileData;
                    setCertificates(certifications);
                }
                setActiveResumeTab(newResumeTabs[0]);
            }
            setTabs(prevTabs => [...prevTabs, ...newTabs.filter(tab => !prevTabs.includes(tab))]);
            setResumeTabs(prevTabs => [...prevTabs, ...newResumeTabs.filter(tab => !prevTabs.includes(tab))]);
        }

    }, [tutorProfileData]);

    const handleEventClick = (event) => {
        console.log("Event clicked:", event);
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
        
        if (showLoginModal) {
            setShowLoginModal(false);
        }
        if (SignUpshowModal) {
            setSignUpShowModal(false);
        }
    }
    const handleCloseScheduleModal = () => setCloseScheduleModal(false);

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
            localStorage.setItem("email", studentemail);
            setVerifyshowModal(true);
          }
        } catch (error) {
            if (error.response.status === 409) {
                // Show toast message for already registered as a student
                toast.error("This email is already registered");
                console.log("Email already registered");
              } else if (error.response.status === 400) {
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
    const token = localStorage.getItem('token');

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements; 
        setShowLoginModal(false);
        login({ studentemail: email.value, studentpassword: password.value})
            .catch((error) => {
                console.error("Mutation failed:", error);
            });
    };

    return (
        <>
        <ToastContainer />
        <div className="CovertNavStatic">
                {token ? <AlternativeNavbar currentImageIndex={0}/> :
                <NavBar currentImageIndex={0} />
                }
            </div>
            {isLoading ? <Spinner /> :
                <>
                    <div className="container" style={{ padding: '1%', marginTop: '20px' }}>
                        <div className="row gap-2">
                            <div className="col-2">
                                <img src={tutorProfileData.profilePhoto ? `${Backend_URI}/${tutorProfileData.profilePhoto}` : 'UserDpNotFound.jpg'} alt="userProfile" style={{ margin: 'auto', borderRadius: '10% 1%' }} height={150} width={120} onError={(e) => {
                                    e.target.src = `./UserDpNotFound.jpg`;
                                    e.target.style.border = '1px solid #ccc';
                                }} />
                            </div>
                            <div className="col-6">
                                <div className="row" style={{ fontWeight: "bold", fontSize: "24px" }}>
                                    {tutorProfileData &&
                                        tutorProfileData.firstName}
                                    {tutorProfileData && tutorProfileData.lastName}
                                    <div className="col-1">
                                        <MdVerified style={{ display: "inline", color: "green", marginTop: '-4px' }} />
                                    </div>
                                </div>
                                <div className="row">
                                    Certified tutor with 3 years of teaching experience
                                </div>

                                <div className="row" style={{ marginTop: '20px', fontSize: 'inherit', color: '#4d4c5c' }}>
                                    <div className="col-sm-1" style={{ marginLeft: '-25px' }}>
                                        <SlGraduation style={{ marginLeft: '10px', marginTop: '-4px' }} />
                                    </div>
                                    {tutorProfileData && <>
                                        Teaches {tutorProfileData.subjectsTaught} lessons </>}
                                </div>
                                <div className="row" style={{ fontSize: 'inherit', color: '#4d4c5c' }}>
                                    <div className="col-sm-1" style={{ marginLeft: '-25px' }}>
                                        {/* <SlGraduation  style={{marginLeft:'10px', marginTop:'-4px'}}/> */}
                                        <svg style={{ marginLeft: '10px', marginTop: '-4px' }} height={22} width={18} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fillRule="evenodd" d="M7.5 6a3.5 3.5 0 1 0 .059 7 8.797 8.797 0 0 1-.013.295c-.064 1.03-.295 1.914-.465 2.311a1 1 0 0 0 1.626 1.101c1.463-1.463 2.017-3.328 2.22-4.753a11.389 11.389 0 0 0 .087-2.354A6.215 6.215 0 0 0 11 9.444v-.003A3.5 3.5 0 0 0 7.5 6Zm9 0a3.5 3.5 0 1 0 .059 7 8.878 8.878 0 0 1-.013.295c-.064 1.03-.295 1.914-.465 2.311a1 1 0 0 0 1.626 1.101c1.463-1.463 2.017-3.328 2.22-4.753a11.389 11.389 0 0 0 .087-2.354A6.215 6.215 0 0 0 20 9.44 3.5 3.5 0 0 0 16.5 6Z" clipRule="evenodd"></path></svg>
                                    </div>
                                    {tutorProfileData && <>
                                        Speaks {tutorProfileData.LanguageSpoken}</>}
                                </div>
                                <div className="row" style={{ marginBottom: '10px', fontSize: 'inherit', color: '#4d4c5c' }}>
                                    <div className="col-sm-1" style={{ marginLeft: '-25px' }} >
                                        <PiStudentDuotone style={{ marginLeft: '10px', marginTop: '-4px' }} />
                                    </div>
                                    1 lessons taught
                                </div>

                            </div>

                        </div>
                    </div>
                    <AppBar className={`${classes.stickyAppBar} MuiAppBar-positionSticky`}>
                        <Tabs value={value} onChange={handleChange} className={classes.tabs}>
                            {tabs.map((tab, index) => (
                                <Tab key={index} label={tab} className={classes.tab} />
                            ))}
                        </Tabs>
                    </AppBar>
                    <div className="container-fluid" style={{ marginLeft: '65px' }}>
                        <div className="row">
                            <div className="col-7">
                                {tabs.includes("About") &&
                                    (<div className="row" ref={aboutRef} >
                                        <h3 style={{ margin: '30px 0px 20px 0px' }}>About the tutor</h3>
                                        <p style={{ whiteSpace: 'pre-line' }}>
                                            {(() => {
                                                let newContent = '';
                                                if (tutorProfileData && tutorProfileData.profileDescription) {
                                                    newContent += tutorProfileData.profileDescription.introduceYourself + '\n\n';
                                                    newContent += tutorProfileData.profileDescription.motivateStudents + '\n\n';
                                                    newContent += tutorProfileData.profileDescription.teachingExperience;
                                                    content = newContent;
                                                }
                                                return (
                                                    <>
                                                        {content.length > 100 ? (
                                                            <>
                                                                {showMoreIndex ? newContent : `${newContent.slice(0, 300)}...`}
                                                                <div onClick={() => toggleShowMore()} style={{ fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
                                                                    {showMoreIndex ? ' Hide Details' : ' Read more'}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            newContent
                                                        )}
                                                    </>
                                                );
                                            })()}
                                        </p>
                                        <hr />
                                    </div>)}
                                {tabs.includes("Schedule") &&
                                    (<div className="row" style={{ height: '600px' }} ref={scheduleRef} >

                                        <h3 style={{ margin: '30px 0px 20px 0px' }}>Schedule</h3>
                                        <div>
                                            <Calendar
                                                localizer={localizer}
                                                events={events ? events : event}
                                                startAccessor="start"
                                                endAccessor="end"
                                                defaultView="week"
                                                views={['week']}
                                                date={date}
                                                onNavigate={onNavigate}
                                                style={{ height: 450 }}
                                                onSelectEvent={handleEventClick}
                                            />
                                            <style>
                                                {`
 .rbc-time-gutter {
    display: none;
 }
 .rbc-label {
    padding: 0 ;
}
.rbc-row,.rbc-time-content, .rbc-event, .rbc-time-view,.rbc-time-header-content, .rbc-time-header, .rbc-timeslot-group,.rbc-day-slot, .rbc-time-slot {
    border: none !important;
 }

 .rbc-toolbar-label{
    padding: 10px 10px;
    text-align: justify;
 }
 .rbc-time-content > * + * > *{
    border: none !important;
 }
 .rbc-events-container{
    position: static;
 }
 .rbc-event.rbc-selected, .rbc-event{
    background-color: white;
    color: black;
    
    
 }
  .rbc-event{
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
 }
 .rbc-event:focus{
    outline: none;
 }
 .rbc-today {
    background-color: white;
}
 .rbc-header{
    height: 29px;
    border-top: 7px solid green;
    border-radius: 3px;
    margin-right: 3px;
    margin-bottom: 3px;
    padding:4px;
    fontSize: 16px;
    border-bottom: none  ;
    border-right: none  ;
    border-left: none !important;
}
`}
                                            </style>
                                        </div>
                                        <hr />
                                    </div>)}
                                {tabs.includes("Resume") && (<div className="row" ref={resumeRef}  >

                                    <h3 style={{ margin: '30px 0px 20px 0px' }}>Resume</h3>
                                    <AppBar position="static" style={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid #ccc', height: '50px' }}>
                                        <Tabs style={{ marginLeft: '0px' }} value={resumeTabValue} onChange={(event, newValue) => handleResumeTabChange(event, newValue)} className={classes.tabs}>
                                            {ResumeTabs.map((tab, index) => (
                                                <Tab key={index} label={tab} className={classes.tab} onClick={() => setResumeTabValue(index)} />
                                            ))}
                                        </Tabs>
                                    </AppBar>
                                    <div>
                                        {renderResumeContent()}
                                    </div>
                                    <hr />
                                </div>)}
                            </div>
                            <div className="col-4 vid TutorSidevideo" >
                                <div className="row" style={{ width: '100%', marginLeft: '18px', padding: '2px' }}>
                                    <ReactPlayer
                                        style={{ border: '2px solid black', borderRadius: '5px', padding: 0 }}
                                         url="https://www.youtube.com/watch?v=rEGSx47bg80"
                                        //url={`${Backend_URI}/${tutorProfileData.video.data}`}
                                        controls
                                        height={230}
                                        width={350}
                                        onError={() => {
                                            console.log('Video loading error');


                                        }}
                                        config={{
                                            file: {
                                                attributes: {
                                                   // poster: `${Backend_URI}/${tutorProfileData.video.thumbnail}`
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="row" style={{ margin: '20px 0px 20px 0px', display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="col-6" style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '22px' }}>New</div>
                                        <div>tutor</div>
                                    </div>
                                    <div className="col-6" style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '22px' }}>$ {tutorProfileData.hourlyPriceUSD}</div>
                                        <div>50-min lesson</div>
                                    </div>
                                </div>
                                <div className="row">
                                {!token ?
                                    <button className="btn" onClick={handleShowSignUpModal} style={{ fontWeight: 'bold', background: 'linear-gradient(to top, #3661a0, #57cbf5)', marginLeft: '1.8rem', marginTop: '1rem', border: '2px solid black', padding: '8px', borderRadius: '10px', width: '83%' }}>
                                        <HiBolt /> Book a trial
                                    </button>
                                    : 
                                    <button className="btn" onClick={handleShowScheduleModal} style={{ fontWeight: 'bold', background: 'linear-gradient(to top, #3661a0, #57cbf5)', marginLeft: '1.8rem', marginTop: '1rem', border: '2px solid black', padding: '8px', borderRadius: '10px', width: '83%' }}>
                                    <HiBolt /> Book a trial
                                </button>
                              }
                                </div>
                                <div className="row">
                                {!token ?
                                    <button className="btn hov-btn" onClick={handleShowSignUpModal} style={{ background: 'white', border: '2px solid black', marginLeft: '1.8rem', marginTop: '1rem', padding: '8px', borderRadius: '10px', width: '83%' }}>
                                        <BiMessageSquareDetail /> Send Message
                                    </button>
                                    :
                                    <button className="btn hov-btn" onClick={handleShowScheduleModal} style={{ background: 'white', border: '2px solid black', marginLeft: '1.8rem', marginTop: '1rem', padding: '8px', borderRadius: '10px', width: '83%' }}>
                                    <BiMessageSquareDetail /> Send Message
                                </button>
                               }
                               
                               
                   <Modal show={verifyshowModal} onHide={handleCloseVerifyModal} centered className="modal-signup">

<Modal.Body>
<div className="m-5 d-flex justify-content-center align-items-center vh-100">
{loadingState ? (
<div
style={{
display: "flex",
justifyContent: "center",
alignItems: "center",
}}
>
<Box sx={{ display: "flex" }}>
<CircularProgress />
</Box>
</div>
) : (
<div
style={{
width: "20rem",
border: "1px solid grey",
padding: "20px 15px",
borderRadius: "10px",
boxShadow: "5px 10px 18px #888888",
marginBottom: "350px",
}}
>
<form onSubmit={handleData}>
<h4
className="text-center mb-4"
style={{ color: "#233D7B", fontWeight: "bold" }}
>
Enter your code
</h4>
<p className="text-center mb-4">
Please enter the Code received on your email for verification.
</p>
<div className="d-flex mb-3">
{Array.from({ length: 6 }, (_, i) => (
<input
 key={i}
 type="tel"
 name={`code${i + 1}`}
 maxLength="1"
 pattern="[0-9]"
 value={formValues[`code${i + 1}`]}
 onChange={(e) => handleInputChange(e, `code${i + 1}`)}
 className="form-control"
 style={{ margin: "0px 5px" }}
 required
 ref={inputRefs[`code${i + 1}`]}
/>
))}
</div>
<button
type="submit"
className="w-100 btn btn-primary"
style={{ background: "#318F3A" }}
>
Verify account
</button>
{validationError && (
<div className="alert alert-danger mt-3">{validationError}</div>
)}
</form>
</div>
)}
</div>
</Modal.Body>
</Modal>

 <Modal show={SignUpshowModal} onHide={handleCloseSignUpModal} centered className="modal-signup">

                                                        <Modal.Body>
                                                            <div className="modal-auth-content">
                                                                <img src={tutorProfileData.profilePhoto ? `${Backend_URI}/${tutorProfileData.profilePhoto}` : 'UserDpNotFound.jpg'} alt="userProfile" style={{ margin: 'auto', borderRadius: '10% 1%' }} height={100} width={90} onError={(e) => {
                                                                    e.target.src = `./UserDpNotFound.jpg`;
                                                                    e.target.style.border = '1px solid #ccc';

                                                                }} />
                                                                <h4>
                                                                    Sign up to start learning
                                                                </h4>
                                                                <span>
                                                                    <small>
                                                                        Only one step left to book your lesson with
                                                                        &nbsp;{tutorProfileData.firstName} {tutorProfileData.lastName}
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

                                                    <ScheduleModal availability={tutorProfileData.availability} showScheduleModal={showScheduleModal} handleCloseScheduleModal={handleCloseScheduleModal} profilePhoto={tutorProfileData.profilePhoto} />
                                </div>
                                <div className="row" style={{ marginTop: '1rem', marginLeft: '1.8rem' }}>
                                    <div className="col-1">
                                        <LuClock3 />
                                    </div>
                                    <div className="col">

                                        <p>Usually responds in less than an hour</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div style={{ marginTop: '50px' }}>

                        <TutorSearchFooter />
                    </div>
                </>
            }
        </>
    );
};

export default TutorProfile;
