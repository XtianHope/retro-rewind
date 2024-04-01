import { useState, useEffect } from "react";
import '../assets/css/Trivia.css'; // Import css file
//import LisaSimpsonImage from '../assets/images/lisa-simpson.jpg'; // Cant get image to import without error?

const Trivia = () => {
    const [timeLeft, setTimeLeft] = useState(300); //5 minutes is 300 seconds
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index keeps track of question user is on
    const [selectedOption, setSelectedOption] = useState(null); // Keeps track of user selected answer
    const [score, setScore] = useState(0); // User score
    const [showResult, setShowResult] = useState(false); // Show result page
    const [highScores, setHighScores] = useState([]); // High scores - Array to store
    const questions = [
        {
            id: 1,
            question: "Who am I?",
            // image: <img src={LisaSimpsonImage} alt="Question" />,
            options: ["Lisa Simpson", "Bart Simpson", "Marge Simpson", "Homer Simpson"],
            answer: "Lisa Simpson"
        },
        // Test this one question before adding more
    ];

    // Timer
    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                if (prevTimeLeft <= 0 || currentQuestionIndex >= questions.length) {
                    clearInterval(timerInterval);
                    setShowResult(true);
                    return 0;
                }
                return prevTimeLeft - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval); // Function clears time interval
    }, [currentQuestionIndex, questions.length]);

    // Option selection
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    // Next Question
    const handleNextQuestion = () => {
        if (selectedOption === questions[currentQuestionIndex].answer) { // Is answer correct
            setScore(prevScore => prevScore + 1);
        }

        // Move to next
        setSelectedOption(null);
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    // High Scores
    const addHighScore =() => {
        const userScore = score;
        const userName = "User";
        setHighScores([...highScores, {userName, userScore}]);
    };


    // Restart - Reset to 5 min/300 sec - Reset to  first question - Reset score to 0
    const handleRestart = () => {
        setTimeLeft(300);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setScore(0);
        setShowResult(false);
    };


 // useEffect function to prevent re-rendering
 useEffect(() => {
    if (showResult) {
        addHighScore(); 
    }
}, [showResult]);


// Trivia component
    return (
        <div className="trivia-container">
            {showResult ? (
                <div>
                    <h2>Result</h2>
                    <p>Your score: {score}</p>
                    <button onClick={handleRestart}>Restart</button>
                </div>
            ) : (
                <div>
                    <h1>Trivia</h1>
                    <h2>Time left: {timeLeft}</h2>
                    <h3>Question {currentQuestionIndex + 1}</h3>
                    <h4>{questions[currentQuestionIndex].question}</h4>
                    <img src={questions[currentQuestionIndex].image} alt="Question" />
                    <div>
                        {questions[currentQuestionIndex].options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleOptionSelect(option)}
                                disabled={selectedOption !== null || selectedOption === option}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleNextQuestion} disabled={!selectedOption}>Next</button>
                </div>
            )}

        </div>
    );
};


export default Trivia;