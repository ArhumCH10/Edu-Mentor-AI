import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLocation  } from 'react-router-dom';

const API_KEY = 'AIzaSyCRMYtF7su-TU_rcRq0Bt4kcGbB1vAiYww';

const quizData = {
  questions: [],
  totalQuestions: 0, // Adjust as needed
  timePerQuestion: 30
};

const Quiz = () => {
 
  const location = useLocation();
  useEffect(() => {
    if (!location.state || !location.state.topic || !location.state.quizOutline) {
      window.location.href = 'http://localhost:5173/studentdashboard/dashboard';
    } else {
      AiQuizGenerate();
    }
  }, [location?.state]);
  useEffect(() => {
    if (location?.state?.quizOutline && location?.state?.quizOutline) {
      AiQuizGenerate();
    }
  }, [location?.state?.quizOutline]);

  const genAI = new GoogleGenerativeAI(API_KEY);
  async function AiQuizGenerate() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    const prompt = `Generate a ${quizData.totalQuestions}-question multiple choice quiz on the topic of '${location.state.topic}'.The questions should be related to the following content: 
    '${location.state.quizOutline}'. Each question should be worth 1 mark and should have 4 options with only one correct answer. Please provide the questions, the four options for each question.`;

  
    const result = await model.generateContent(prompt);
    
    console.log(result);
    const response =  result.response;
    const text = response.text();
    console.log(text);
  }
  
  

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(quizData.timePerQuestion);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const [quizStarted, setQuizStarted] = useState(false); 

  useEffect(() => {
    if (quizStarted && timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
      return () => clearInterval(timerInterval);
    } else if (timer === 0) {
      handleSubmit();
    }
  }, [timer, quizStarted]);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleOptionClick = (option) => {
    if (!quizStarted) return; 
    setUserAnswer(option);
  };
  const handleNext = () => {
    setAnswers([...answers, { questionId: currentQuestion.id, userAnswer }]);
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetTimerAndAnswer();
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      resetTimerAndAnswer();
    }
  };

  const resetTimerAndAnswer = () => {
    setTimer(quizData.timePerQuestion);
    setUserAnswer(null);
  };

  const handleSubmit = () => {
    setAnswers([...answers, { questionId: currentQuestion.id, userAnswer }]);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div style={containerStyle}>
        <h2>Quiz Completed!</h2>
        <div style={resultStyle}>
          {answers.map((answer, index) => {
            const question = quizData.questions.find(q => q.id === answer.questionId);
            return (
              <div key={index}>
                <p>{question.question}</p>
                <p>Your answer: {answer.userAnswer}</p>
                <p>Correct answer: {question.correctAnswer}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (

    <> {!quizStarted && (
    <div className="modal-wrapper">
  <div className="modal">
    <div className="modal-content">
      <div className="modal-header">
        <h2>Quiz on <span>{location.state?.topic}</span></h2>
      </div>
      <div className="modal-body">
        <h4>Rules & Regulations</h4>
        <ul>
          <li>There are 10 MCQs.</li>
          <li>Each question has 30 seconds.</li>
          <li>Quiz will be auto-submitted if any unauthorized actions occur (e.g., opening a new tab).</li>
          <li>Ensure your Wi-Fi connection is stable.</li>
        </ul>
        <div className="warning" style={{backgroundColor: '#ffe0b2', border: '1px solid #ffb74d', 
          borderRadius:'4px', padding: '10px', marginTop: '20px',
        }}>
          <p style={{margin: 0,color: '#f57c00'}}>Warning: Please do not attempt to open new tabs or use unauthorized aids during the quiz. You are Monitoring.</p>
        </div>
      </div>
      <div className="modal-footer">
        <button className="quiz-toggle" onClick={startQuiz}>Start Quiz</button>
      </div>
    </div>
  </div>
</div>
    )}
<div>
{quizStarted && (
      <div style={{
        backgroundImage: 'url(./logo.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}>
        <div style={containerStyle}>
          <div style={headerStyle}>
            <div style={topicStyle}>Topic: Networking</div>
            <div style={timerStyle}>
              <span>Question-{currentQuestionIndex + 1}/{quizData.totalQuestions}</span>
              <div style={timerCircleStyle}>{timer}</div>
              <span style={gearStyle}>&#9881;</span>
            </div>
          </div>
          <div style={progressBarStyle}>
            <div style={{ ...progressStyle, width: `${((currentQuestionIndex + 1) / quizData.totalQuestions) * 100}%` }}></div>
          </div>
          <div style={questionStyle}>{currentQuestion.question}</div>
          <div style={optionsContainerStyle}>
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                style={{ ...optionStyle, backgroundColor: userAnswer === option ? '#c8e6c9' : '#ffffff' }}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
            <button style={buttonStyle} onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
)}
</div>
    </>
  );
};

const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#55C7F2',
  borderRadius: '10px',
  width: '60%',
  margin: 'auto',
  justifyContent: "center",
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  alignItems: 'center', marginTop: '150px',

};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const topicStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const questionStyle = {
  fontSize: '20px',
  margin: '20px 0',
};

const progressBarStyle = {
  height: '20px',
  width: '100%',
  backgroundColor: '#cfd8dc',
  borderRadius: '10px',
  overflow: 'hidden',
  marginBottom: '20px',
};

const progressStyle = {
  height: '100%',
  backgroundColor: '#4caf50',
};

const optionsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px',
};

const optionStyle = {
  backgroundColor: '#ffffff',
  border: '2px solid #4caf50',
  borderRadius: '5px',
  padding: '10px',
  cursor: 'pointer',
  fontSize: '16px',
};

const timerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const timerCircleStyle = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  border: '2px solid #f44336',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '10px',
  fontWeight: 'bold',
  color: '#f44336',
};

const gearStyle = {
  marginLeft: '10px',
  fontSize: '24px',
  cursor: 'pointer',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

const buttonStyle = {
  backgroundColor: '#4caf50',
  color: '#ffffff',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px',
};

const resultStyle = {
  marginTop: '20px',
  fontSize: '18px',
  color: '#ff5722',
  textAlign: 'left'
};

export default Quiz;
