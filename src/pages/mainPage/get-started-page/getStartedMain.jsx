import { useEffect } from "react";
import { useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useSearchParams } from 'react-router-dom';
import { useTotalTutor } from "../../../services/useTotalTutor";
import { GetStarted } from "./getStarted";
import { Component1 } from './Component1';
import { Component2 } from './Component2';
import { Component3 } from './Component3';
import { Component4 } from './Component4';
import { StartedSpinner } from './StartedSpinner';
import './getStarted.css';

function GetStartedMain() {

    const [searchQuery, setSearchQuery] = useSearchParams();

    const [componentIndex, setComponentIndex] = useState(0);
    const [selectedSubject, setSelectedSubject] = useState();
    const [totalTutor, setTotalTutor] = useState(0);
    const [mySubject, setMySubject] = useState('');
    const [wrongQuery, setWrongQuery] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [englishLevel, setEnglishLevel] = useState(null);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);

    const { mutate } = useTotalTutor(setTotalTutor, setLoading);

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

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        const subjectFromQuery = searchQuery.get("subject");
        const isValidSubject = subjects.some(subject => subject.value === subjectFromQuery);
        if (isValidSubject) {
            setMySubject({ subject: searchQuery.get("subject") });
            const selectedSubjectObject = subjects.find(subject => subject.value === subjectFromQuery);
            setSelectedSubject(selectedSubjectObject);
            setWrongQuery(false);
        } else {
            setWrongQuery(true);
        }


        return () => {
            document.body.style.overflowY = "auto";
            document.documentElement.style.overflowY = "auto";
        };
    }, []);
    useEffect(() => {
        //console.log("My subject in useEffect:", mySubject);
        if (mySubject) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    mutate(mySubject)

                } catch (error) {
                    console.error("Error in useEffect:", error);
                }

            };

            fetchData();
        }
    }, [mySubject]);

   return (
        <>
            {componentIndex >= 1 ? (
                <>
                    {componentIndex === 5 ? (
                        <StartedSpinner />
                    ) : (<div className='row' style={{ height: '100vh' }}>
                        <div className="col-6 left-Section" style={{ padding: '4rem' }}>
                            <div className="row ">
                                <span>

                                    <IoReturnUpBackOutline className='back-btn' style={{ fontWeight: 'bold', fontSize: '30px', padding: '3px' }}
                                        onClick={() => {
                                            let previousComponentIndex = componentIndex;
                                            previousComponentIndex = previousComponentIndex - 1;
                                            setComponentIndex(previousComponentIndex);
                                        }} />
                                </span>

                            </div>

                            {componentIndex === 1 &&
                                (<div className="row" style={{ margin: '0 auto', padding: '33% 0' }} >
                                    <h1 style={{ fontWeight: 'bold', fontSize: '3.5rem' }} >What&apos;s your goal?</h1></div>)}

                            {componentIndex === 2 &&
                                (<div className="row" style={{ margin: '0 auto', padding: '30% 0', paddingBottom: '26%' }} >
                                    <h1 style={{ fontWeight: 'bold', fontSize: '3.2rem' }} >What&apos;s your English level?</h1> </div>)}

                            {componentIndex === 3 &&
                                (<div className="row" style={{ margin: '0 auto', padding: '30% 0', paddingBottom: '26%' }} >
                                    <h1 style={{ fontWeight: 'bold', fontSize: '3.2rem' }} >Looking for a specific culture or accent?</h1> </div>)}

                            {componentIndex === 4 &&
                                (<div className="row" style={{ margin: '0 auto', padding: '30% 0', paddingBottom: '26%' }} >
                                    <h1 style={{ fontWeight: 'bold', fontSize: '3.2rem' }} >When can you take lessons?</h1> </div>)}


                            <div className="row" style={{ padding: '7% 0' }}>
                                <span>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.5rem', marginRight: '3px' }}>
                                        Mentor

                                    </span>
                                    <img src="./logo.png" alt="logo" height={50} width={50} style={{ marginTop: '-3px' }} />
                                </span>
                            </div>
                        </div>

                        <div className="col-6" style={{ padding: '4rem' }}>
                            <div className="row" style={{ textAlign: 'right' }}>
                                <span>
                                    <a className="skip" href="#"
                                        onClick={() => {
                                            let previousComponentIndex = componentIndex;
                                            previousComponentIndex = previousComponentIndex + 1;
                                            setComponentIndex(previousComponentIndex);
                                        }} style={{ fontSize: '1rem', color: 'black', fontWeight: 600 }}>
                                        Skip
                                    </a>
                                </span>
                            </div>
                            <div className="row" style={{ paddingTop: componentIndex === 3 ? '5%' : componentIndex === 4 ? '0%' : '13%', marginBottom: '2rem', height: componentIndex === 1 ? '75%' : componentIndex === 2 ? '75%' : componentIndex === 3 ? '75%' : '75%', overflowY: 'auto', overflowX: 'hidden' }}>
                                {componentIndex === 1 && (
                                    <Component1 selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                                )}
                                {componentIndex === 2 && (
                                    <Component2 englishLevel={englishLevel} setEnglishLevel={setEnglishLevel} />
                                )}
                                {componentIndex === 3 && (
                                    <Component3 searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchResults={searchResults} setSearchResults={setSearchResults} selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} />
                                )}
                                {componentIndex === 4 && (
                                    <Component4 selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
                                )}

                            </div>
                            <div className="row">
                                <button className='continue-button' type="button"
                                    onClick={() => {

                                        let previousComponentIndex = componentIndex;
                                        previousComponentIndex = previousComponentIndex + 1;
                                        setComponentIndex(previousComponentIndex);
                                    }}
                                >Continue</button>
                            </div>
                        </div>
                    </div>)}

                </>
            ) : (
                <GetStarted isLoading={isLoading} setLoading={setLoading} mySubject={mySubject} setMySubject={setMySubject} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} wrongQuery={wrongQuery} setSearchQuery={setSearchQuery} setWrongQuery={setWrongQuery} setComponentIndex={setComponentIndex} totalTutor={totalTutor} subjects={subjects} />
            )}
        </>
    );
}

export default GetStartedMain;
