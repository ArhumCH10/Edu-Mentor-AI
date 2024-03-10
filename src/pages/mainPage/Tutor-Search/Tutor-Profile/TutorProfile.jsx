import { useState, useRef, useEffect } from "react";
import NavBar from "../../../../ui/NavBar";
import { MdVerified } from "react-icons/md";
import { SlGraduation } from "react-icons/sl";
import { PiStudentDuotone } from "react-icons/pi";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from 'react-player';
import { HiBolt } from "react-icons/hi2";
import { BiMessageSquareDetail } from "react-icons/bi";
import { LuClock3 } from "react-icons/lu";
import TutorSearchFooter from "../TutorSearchFooter";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
import './TutorProfile.css';


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
    const aboutRef = useRef(null);
    const scheduleRef = useRef(null);
    const resumeRef = useRef(null);
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const tabs = ["About", "Schedule", "Resume"];
    const ResumeTabs = ["Education", "Certification"];
    const [resumeTabValue, setResumeTabValue] = useState(0);
    const [activeResumeTab, setActiveResumeTab] = useState(ResumeTabs[0]);
    const content = ` Hello there! I'm KinG, an amazing English speaker, passionate about teaching.


    I'm TEFL certified with 3 years of teaching experience and YOUR SUCCESS IS MY GOAL!



    Do you really want to take your English to the next level and are you serious about cutting back on mistakes, and improving pronunciation, fluency and efficiency, as well as preparing for IELTS/TOEFL and improving your English in business environments? Then you're on the right profile.


    Why not book a lesson with me and let's get started already. See you soon!`;

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
        console.log('new value: ', newValue);
        console.log('active tab: ', activeResumeTab);

    };

    const [showMoreIndex, setShowMoreIndex] = useState(false);

    const toggleShowMore = () => {
        setShowMoreIndex(!showMoreIndex);
    };

    // const [certificates, setCertificates] = useState([]);
    // const [educations, setEducations] = useState([]);


    const renderResumeContent = () => {
        switch (activeResumeTab) {
            case 'Education':
                return (
                    <div className='Resume-content' >

                        {/* {educations.map((edu, index) => {
                  return (
                    <div key={index} className="row">
                      <div className="col-2">
                        {`${edu.yearsOfStudyFrom} - ${edu.yearsOfStudyTo || '2023'}`}
                      </div>
                      <div className="col-10">
                        <div className="row">{edu.university}</div>
                        <div className="row" style={{ marginLeft: '-22px' }}><small>{`${edu.degree} in ${edu.degreeType}`}</small></div>
                        {edu.educationPhoto ?
                          (<div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'green' }}><RiVerifiedBadgeFill style={{ marginTop: '-5px' }} /> Education Verified</small></div>) :
                          (<div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'red' }}><TiDelete style={{ marginLeft: '-5px', marginTop: '-5px', fontSize: '1.1rem' }} /> Education Not Verified</small></div>)}
                      </div>
                    </div>
                  );
                })} */}
                        {/* hardcode of education */}
                        <div className="row">
                            <div className="col-3">
                                {`${2020} - ${'2022'}`}
                            </div>
                            <div className="col-9">
                                <div className="row"> University Of Central Punjab (UCP)</div>
                                <div className="row" style={{ marginLeft: '-22px' }}><small>{`${'Bachelor'} in ${'Software Engineering'}`}</small></div>
                                <div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'green' }}><RiVerifiedBadgeFill style={{ marginTop: '-5px' }} /> Education Verified</small></div>
                            </div>
                        </div>
                    </div>
                );
            case 'Certification':
                return (
                    <div className='Resume-content'>
                        {/* {certificates.map((cert, index) => {
                            return (
                                <div key={index} className="row">
                                    <div className="col-2">
                                        {`${cert.yearsOfStudyFrom} - ${cert.yearsOfStudyTo || '2023'}`}
                                    </div>
                                    <div className="col-10">
                                        <div className="row">{cert.subject}</div>
                                        <div className="row" style={{ marginLeft: '-22px' }}><small>{`${cert.certificate} By ${cert.issuedBy}`}</small></div>
                                        {cert.certificationPhoto ?
                                            (<div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'green' }}><RiVerifiedBadgeFill style={{ marginTop: '-5px' }} /> Certificate Verified</small></div>) :
                                            (<div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'red' }}><TiDelete style={{ marginLeft: '-5px', marginTop: '-5px', fontSize: '1.1rem' }} /> Certificate Not Verified</small></div>)}
                                    </div>
                                </div>
                            );
                        })} */}
                        <div className="row">
                            <div className="col-3">
                                {`${2023} - ${'2024'}`}
                            </div>
                            <div className="col-9">
                                <div className="row">English</div>
                                <div className="row" style={{ marginLeft: '-22px' }}><small>{`${'Engineering Certificate'} By ${'Microsoft'}`}</small></div>
                                <div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'red' }}><TiDelete style={{ marginLeft: '-5px', marginTop: '-5px', fontSize: '1.1rem' }} /> Certificate Not Verified</small></div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const currentDate = new Date();

    const [events] = useState([

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
            const alltimegutter = document.querySelector('rbc-time-gutter');
            if (allDayCell) {
                allDayCell.remove();
            }
            if (alltimegutter) {
                alltimegutter.remove();
            }

        };

        removeUnnecessary();
    }, []);
    return (
        <>
            <div className="CovertNavStatic">
                <NavBar currentImageIndex={0} />
            </div>
            <div className="container" style={{ padding: '1%', marginTop: '20px' }}>
                <div className="row gap-2">
                    <div className="col-2">
                        <img src="./king.jpg" alt="profilePic" height={160} width={145} />

                    </div>
                    <div className="col-6">
                        <div className="row" style={{ fontWeight: "bold", fontSize: "24px" }}>
                            Ghous Ali
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
                            Teaches English lessons
                        </div>
                        <div className="row" style={{ fontSize: 'inherit', color: '#4d4c5c' }}>
                            <div className="col-sm-1" style={{ marginLeft: '-25px' }}>
                                {/* <SlGraduation  style={{marginLeft:'10px', marginTop:'-4px'}}/> */}
                                <svg style={{ marginLeft: '10px', marginTop: '-4px' }} height={22} width={18} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fillRule="evenodd" d="M7.5 6a3.5 3.5 0 1 0 .059 7 8.797 8.797 0 0 1-.013.295c-.064 1.03-.295 1.914-.465 2.311a1 1 0 0 0 1.626 1.101c1.463-1.463 2.017-3.328 2.22-4.753a11.389 11.389 0 0 0 .087-2.354A6.215 6.215 0 0 0 11 9.444v-.003A3.5 3.5 0 0 0 7.5 6Zm9 0a3.5 3.5 0 1 0 .059 7 8.878 8.878 0 0 1-.013.295c-.064 1.03-.295 1.914-.465 2.311a1 1 0 0 0 1.626 1.101c1.463-1.463 2.017-3.328 2.22-4.753a11.389 11.389 0 0 0 .087-2.354A6.215 6.215 0 0 0 20 9.44 3.5 3.5 0 0 0 16.5 6Z" clipRule="evenodd"></path></svg>
                            </div>
                            Speaks English
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
                        <div className="row" ref={aboutRef} >
                            <h3 style={{ margin: '30px 0px 20px 0px' }}>About the tutor</h3>
                            <p>
                                {content.length > 100 ? (
                                    <>
                                        {showMoreIndex ? content : `${content.slice(0, 300)}...`}
                                        <div onClick={toggleShowMore} style={{ fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
                                            {showMoreIndex ? ' Hide ' : ' Show more'}
                                        </div>
                                    </>
                                ) : (
                                    content
                                )}
                            </p>
                            <hr />
                        </div>
                        <div className="row" style={{ height: '600px' }} ref={scheduleRef} >

                            <h3 style={{ margin: '30px 0px 20px 0px' }}>Schedule</h3>
                            <div>
                                <Calendar
                                    localizer={localizer}
                                    events={events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    defaultView="week"
                                    views={['week']}
                                    date={date}
                                    onNavigate={onNavigate}
                                    style={{ height: 450 }}
                                    
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
 .rbc-event:focus{
    outline: none;
 }
 .rbc-header{
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
                        </div>
                        <div className="row" ref={resumeRef}  >

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
                        </div>
                    </div>
                    <div className="col-4 vid TutorSidevideo" >
                        <div className="row" style={{ width: '100%', marginLeft: '18px', padding: '2px' }}>
                            <ReactPlayer
                                style={{ border: '2px solid black', borderRadius: '5px', padding: 0 }}
                                url="https://www.youtube.com/watch?v=rEGSx47bg80"
                                controls
                                height={230}
                                width={350}
                            />
                        </div>
                        <div className="row" style={{ margin: '20px 0px 20px 0px', display: 'flex', justifyContent: 'space-between' }}>
                            <div className="col-6" style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '22px' }}>New</div>
                                <div>tutor</div>
                            </div>
                            <div className="col-6" style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '22px' }}>Rs 3,632</div>
                                <div>50-min lesson</div>
                            </div>
                        </div>
                        <div className="row">
                            <button className="btn" style={{ fontWeight: 'bold', background: 'linear-gradient(to top, #3661a0, #57cbf5)', marginLeft: '1.8rem', marginTop: '1rem', border: '2px solid black', padding: '8px', borderRadius: '10px', width: '83%' }}>
                                <HiBolt /> Book a trail
                            </button>
                        </div>
                        <div className="row">
                            <button className="btn hov-btn" style={{ background: 'white', border: '2px solid black', marginLeft: '1.8rem', marginTop: '1rem', padding: '8px', borderRadius: '10px', width: '83%' }}>
                                <BiMessageSquareDetail /> Send Message
                            </button>
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
    );
};

export default TutorProfile;
