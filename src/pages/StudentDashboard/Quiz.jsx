import   { useState, useEffect } from 'react';

const quizData = {
  questions: [
    {
      id: 1,
      question: 'Which of this is not a network edge device?',
      options: ['Switch', 'Smartphones', 'PC', 'Servers'],
      correctAnswer: 'Switch'
    },
    {
      id: 2,
      question: 'Which of these is a network edge device?',
      options: ['Router', 'Firewall', 'PC', 'Servers'],
      correctAnswer: 'Router'
    },
    // Add more questions as needed
  ],
  totalQuestions: 6,
  timePerQuestion: 10
};

const NetworkingQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(quizData.timePerQuestion);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = quizData.questions[currentQuestionIndex];

  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
    }

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  const handleOptionClick = (option) => {
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
  justifyContent:"center",
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  alignItems: 'center',  marginTop:'150px',

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

export default NetworkingQuiz;
