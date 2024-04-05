import { useState, useEffect } from "react";
// import '../assets/css/Trivia.css'; // Import css file
import { Navigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css"; // Import css library
import { Button, Container, Header, Image, Grid } from "semantic-ui-react";
import triviabackground from '../../public/images/triviabackground.jpg';


const Trivia = () => {
    const [timeLeft, setTimeLeft] = useState(300); //5 minutes is 300 seconds
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index keeps track of question user is on
    const [selectedOption, setSelectedOption] = useState(null); // Keeps track of user selected answer
    const [score, setScore] = useState(0); // User score
    const [showResult, setShowResult] = useState(false); // Show result page
    const [highScores, setHighScores] = useState([]); // High scores - Array to store

    const questions =[
        {
            id: 1,
            question: "What is the name of Arnold's best friend in 'Hey Arnold'?",
            image: '../../public/images/gerald.jpg',
            options: ["Gerald", "Sid", "Stinky", "Harold"],
            answer: "Gerald"
        },
        {
            id: 2,
            question: "Testing page switching?",
            image: '../../public/images/gerald.jpg',
            options: ["Gerald", "Sid", "Stinky", "Harold"],
            answer: "Gerald"
        },
        {
            id: 3,
            question: "More testing....?",
            image: '../../public/images/gerald.jpg',
            options: ["Gerald", "Sid", "Stinky", "Harold"],
            answer: "Gerald"
        },
    ]
        
        // Test this one question before adding more
    

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
            setScore(prevScore => prevScore + 10);
        }

        // Move to next
        setSelectedOption(null);
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    // High Scores
    const addHighScore = () => {
        const userScore = score;
        const userName = "User";
        setHighScores([...highScores, { userName, userScore }]);
    };


    // Restart - Reset to 5 min/300 sec - Reset to  first question - Reset score to 0
    const handleRestart = () => {
        setTimeLeft(300);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setScore(0);
        setShowResult(false);


        // Restart the timer on "restart" button click
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
    };


    // useEffect function to prevent re-rendering
    useEffect(() => {
        if (showResult) {
            addHighScore();
        }
    }, [showResult]);

    if (currentQuestionIndex > questions.length) {
        // return <Navigate to="/highscores" />;
        return <Navigate to="/highscores" />;
    }

    // Trivia component
    return (
        <div
            style={{
                backgroundImage: `url(${triviabackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    padding: "20px",
                    borderRadius: "10px",
                }}
            >
                <Container textAlign="center">
                    {showResult ? (
                        <div className="result">
                            <Header as="h2">Result</Header>
                            <p>Your score: {score}</p>
                            <Button onClick={handleRestart}>Restart</Button>
                        </div>
                    ) : (
                        <div className="question">
                            <Header as="h1" style={{ fontSize: "150px", fontWeight: "bold" }}>Trivia</Header>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8} textAlign="left">
                                        <Header as="h3">Time left: {timeLeft}</Header>
                                    </Grid.Column>
                                    <Grid.Column width={8} textAlign="right">
                                        <Header as="h4">Score {score}</Header>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Header as="h2">Question {currentQuestionIndex + 1}</Header>
                            <Header as="h3" style={{ fontSize: "25px" }}>{questions[currentQuestionIndex].question}</Header>
                            <Image src={questions[currentQuestionIndex].image} alt="Question" centered />
                            <div className="options">
                                {questions[currentQuestionIndex].options.map((option) => (
                                    <Button
                                        key={option}
                                        onClick={() => handleOptionSelect(option)}
                                        disabled={selectedOption !== null || selectedOption === option}
                                        style={{ fontSize: "20px", fontWeight: "bold", margin: "5px" }}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                            <Button primary onClick={handleNextQuestion} disabled={!selectedOption}>Next</Button>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default Trivia;