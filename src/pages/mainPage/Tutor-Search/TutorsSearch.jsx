//Bonus Work
import { useEffect, useRef } from "react";
import { useState } from "react";
import Select from "react-select";
import { useSearchParams } from 'react-router-dom';
import NavBar from "../../../ui/NavBar";
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
//import { Backend_URI } from '../../Config/Constant';
import ReactPlayer from 'react-player';
import TutorSearchFooter from "./TutorSearchFooter";
import ReactPaginate from 'react-paginate';



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
    const tutor = 'English';
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

    const [totalTutor, setTotalTutor] = useState(0);

    useEffect(() => {

        const subjectFromQuery = searchQuery.get("subject");
        const TTParam = searchQuery.get("TT");
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
        if (TTParam && !isNaN(parseInt(TTParam))) {
            setTotalTutor(parseInt(TTParam));
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
                    // mutate(mySubject)

                } catch (error) {
                    console.error("Error in useEffect:", error);
                }

            };

            fetchData();
        }
    }, [mySubject]);


    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(100);
    const [isRangeModal, setRangeModal] = useState(false);

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
    const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitaeelit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae.';

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
    return (
        <>
            <div className="CovertNavStatic">
                <NavBar currentImageIndex={0} />
            </div>
            <div>
                <h1 style={{ margin: "10px 10px", marginLeft: "20px" }}>
                    Online {tutor} tutors & teachers for private lessons

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

            </div>
            <main>
                <div className="row" style={{ padding: '5px', marginLeft: '20px', fontWeight: 'bold', fontSize: '20px' }}>
                    {totalTutor} {tutor} tutor available
                </div>
                {[1, 2, 3, 4, 5].map((index) => (
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
                                    <img src="./king.jpg" alt="ProfilePic" style={{ margin: 'auto', borderRadius: '10% 1%' }} height={150} width={120} />
                                </div>
                                <div className="col-6 mx-4">
                                    <div className="row" style={{ fontWeight: 'bold', paddingLeft: '10px', marginBottom: '10px' }}>
                                        Ghous Ali
                                        <div className="col-1">
                                            <MdVerified style={{ display: 'inline', color: 'green' }} />
                                        </div>
                                    </div>
                                    <div className="row" style={{ marginBottom: '10px' }}>
                                        <span className="col-3" style={{ marginLeft: '10px', padding: '5px', paddingLeft: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
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
                                    <div className="row">
                                        <p>
                                            {content.length > 100 ? (
                                                <>
                                                    {showMoreIndex === index ? content : `${content.slice(0, 100)}...`}
                                                    <div onClick={() => toggleShowMore(index)} style={{ fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
                                                        {showMoreIndex === index ? ' Hide Details' : ' Read more'}
                                                    </div>
                                                </>
                                            ) : (
                                                content
                                            )}
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
                                            <div style={{ fontWeight: 'bold' }}>Rs 3,632</div>
                                            <div> 50-min lesson</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button className="btn" style={{ fontWeight: 'bold', background: 'linear-gradient(to top, #3661a0, #57cbf5)', border: '2px solid black', marginTop: '6.5rem', padding: '8px', borderRadius: '10px', width: '110%' }}>
                                            Book a trail
                                        </button>
                                    </div>
                                    <div className="row">
                                        <button className="btn hov-btn" style={{ background: 'white', border: '2px solid #ccc', marginTop: '1rem', padding: '8px', borderRadius: '10px', width: '110%' }}>
                                            Send Message
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {hovered == index && (
                            <div className="col-4 vid">
                                <div className="row" style={{ width: '90%', marginLeft: '18px', padding: '2px' }}>
                                    <ReactPlayer
                                        style={{ border: '2px solid black', borderRadius: '5px', padding: 0 }}
                                        url="https://www.youtube.com/watch?v=rEGSx47bg80"
                                        controls
                                        height={230}
                                        width={350}
                                    />
                                </div>
                                <div className="row">
                                    <button className="btn hov-btn" style={{ background: 'white', border: '2px solid black', marginLeft: '1.8rem', marginTop: '1rem', padding: '8px', borderRadius: '10px', width: '80%' }}>
                                        View full schedule
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </main>
            <div className="pagination-container">
                {/* <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    // onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    // pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                /> */}
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

            <TutorSearchFooter />
        </>
    );
}

export default TutorsSearch