import Select from "react-select";
import NavBar from "../../../ui/NavBar";
import toast from 'react-hot-toast';
import styled, { keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';



const bounce = keyframes `
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const ButtonWrapper = styled.a `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: #000;
  color: #ffffff;
  border-radius: 5px;
  cursor: ${({ isLoading }) => (isLoading ? "not-allowed" : "pointer")};
  font-size: 17px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease-in-out;
  width: 250px;
  overflow: hidden;
  margin: 0 5px ;

  &:hover {
    background: linear-gradient(to right, transparent, #00ff00);
    color: #000;
    
  }

  .icon {
    margin-left: 8px;
    animation: ${({ isLoading }) => (isLoading ? "none" : css`${bounce} 1s infinite`)};
  }

  svg {
    fill: #ffffff;
    height: 25px;
    width: 30px;
    transition: transform 0.2s ease-in-out;
  }

  &:focus svg {
    transform: translateX(150px);
  }
`;
const customStyles = {
    control: (provided) => ({
        ...provided,
        '@media (min-width: 470px) and (max-width: 768px)': {
            width: '100px',
        },
        '@media (min-width: 769px) and (max-width: 1024px)': {
            width: '210px',
        },
        '@media (min-width: 1025px) and (max-width: 1449px)': {
            width: '310px',
        },

        '@media (min-width: 1450px)': {
            width: '400px',
        },

    }),

    menuList: (provided) => ({
        ...provided,
        maxHeight: '180px',
    }),
};

export const GetStarted = ({ isLoading, setLoading, mySubject, setMySubject, selectedSubject, setSelectedSubject, setSearchQuery, wrongQuery, setWrongQuery, setComponentIndex, totalTutor, subjects }) => {

    const navigate = useNavigate();


    const moveToTutorSearch = () => {
        navigate(`/tutors-search?subject=${mySubject.subject}`);
    }
    const handleSelectChange = async (selectedOption) => {
        const selectedValue = selectedOption.value;
        setSelectedSubject(selectedOption);
        setMySubject({ subject: selectedValue });
        setSearchQuery({ subject: selectedValue });
        setWrongQuery(false);
    };
    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            document.activeElement.blur();
            if (mySubject) {
                setComponentIndex(1);
            }
            else {
                toast.error("Please select a subject");
            }

        }, 2000);
    };

    return (
        <>
            <NavBar currentImageIndex={0} />
            <div className="container" >

                <div className="row" style={{ marginTop: '3rem' }}>
                    <div className="col-md-6">
                        <div className="text-section">
                            <h1 style={{ fontSize: '50px', fontWeight: 'bold' }}>Find the right tutor for you.</h1>
                            <p>Tell us how you would like to learn to get a personalized choice of tutors</p>
                            <div className="input-area">
                                <label htmlFor="subject">What do you want to learn?</label>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Select
                                        id="subject"
                                        value={selectedSubject}
                                        onChange={handleSelectChange}
                                        options={subjects}
                                        placeholder="Subject"
                                        styles={customStyles}
                                    />
                                    <ButtonWrapper href="#" onClick={handleClick} isLoading={isLoading}>
                                        {isLoading ? "Loading..." : "Get started"}

                                        <span className="icon">
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.086 10.993h-12v2h12l-5.293 5.293 1.414 1.414 7.707-7.707-7.707-7.707L10.793 5.7l5.293 5.293Zm1 1Z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </span>
                                    </ButtonWrapper>
                                </div>
                            </div>
                            <div className="secondary-option">
                                {wrongQuery ? <p style={{ fontSize: '16px', fontWeight: 600, }}>please select a available subject</p> :
                                    !isLoading && totalTutor > 0 ? <span style={{ fontSize: '16px', fontWeight: 600, textDecoration: 'underline' }} onClick={moveToTutorSearch}>Choose by myself from {totalTutor} tutors</span>
                                        : !isLoading && <p style={{ fontSize: '16px', fontWeight: 600, color: 'red' }}> No tutor found</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="image-section">
                            <img src="/girlSearching.png" alt="Person looking at a computer" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


GetStarted.propTypes = {
    wrongQuery: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    subjects: PropTypes.array.isRequired,
    mySubject: PropTypes.string.isRequired,
    selectedSubject: PropTypes.any.isRequired,
    totalTutor: PropTypes.number.isRequired,
    setLoading: PropTypes.func.isRequired,
    setMySubject: PropTypes.func.isRequired,
    setSelectedSubject: PropTypes.func.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    setWrongQuery: PropTypes.func.isRequired,
    setComponentIndex: PropTypes.func.isRequired,
};
