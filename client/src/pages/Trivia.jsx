import { useState, useEffect } from "react";
// import '../assets/css/Trivia.css'; // Import css file
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_SCORE_TO_USER } from "../utils/mutations";
import "semantic-ui-css/semantic.min.css"; // Import css library
import { Button, Container, Header, Image, Grid } from "semantic-ui-react";
import triviabackground from '../../public/images/triviabackground.jpg';
// import { useQuery } from '@apollo/client';


// import { gql } from '@apollo/client';

// export const QUERY_QUESTIONS = gql`
//   query {
//     questions {
//       id
//       question
//       image
//       options
//       answer
//     }
//   }
// `;



const Trivia = () => {
    const [timeLeft, setTimeLeft] = useState(20); //5 minutes is 300 seconds
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index keeps track of question user is on
    const [selectedOption, setSelectedOption] = useState(null); // Keeps track of user selected answer
    const [score, setScore] = useState(0); // User score
    const [showResult, setShowResult] = useState(false); // Show result page
    const [highScores, setHighScores] = useState([]); // High scores - Array to store
    // const [initials, setInitials] = useState(""); // Initials for high score


    // const [questions, setQuestions] = useState([]); // Questions
    // const { loading, error, data } = useQuery(QUERY_QUESTIONS); // Query to get questions

    // useEffect(() => {
    //     if (data) {
    //         const shuffledQuestions = data.questions.sort(() => Math.random() - 0.5);
    //         setQuestions(shuffledQuestions);
    //     }
    // }, [data]);

    const [addScoreToUser, { error }] = useMutation(ADD_SCORE_TO_USER);
    const navigate = useNavigate();

    if (error) console.log(error);

    const questions = [
        {
            id: 1,
            question: "What is the name of Arnold's best friend in 'Hey Arnold'?",
            image: '../../public/images/gerald.jpg',
            options: ["Gerald", "Sid", "Stinky", "Harold"],
            answer: "Gerald"
        },
        {
            id: 2,
            question: "Who is the fearless dog protecting his owners from various monsters and villains?",
            image: '../../public/images/courage.jpg',
            options: ["Katz", "Muriel", "Eustace", "Courage the Cowardly Dog"],
            answer: "Courage the Cowardly Dog"
        },
        {
            id: 3,
            question: "Which show is set in the future and follows the adventures of a delivery boy?",
            image: '../../public/images/futurama.jpg',
            options: ["Futurama", "The Jetsons", "Space Odyssey", "Tomorrowland"],
            answer: "Futurama"
        },
        {
            id: 4,
            question: "What is the name of the evil genius cat in 'Pinky and The Brain'?",
            image: '../../public/images/pinky-brain.jpg',
            options: ["Whiskers", "Snowball", "Fluffy", "Snowflake"],
            answer: "Snowball"
        },
        {
            id: 5,
            question: "What is the name of the pet dog owned by the Simpson family?",
            image: '../../public/images/santas-little-helper.jpg',
            options: ["Rover", "Fido", "Santa's Little Helper", "Spot"],
            answer: "Santa's Little Helper"
        },
        {
            id: 6,
            question: "What is the name of the laboratory monkey in 'Dexter's Laboratory'?",
            image: '../../public/images/monkey.jpg',
            options: ["Hairy Larry", "Monkey", "Bobo", "Fred"],
            answer: "Monkey"
        },
        {
            id: 7,
            question: "What is the catchphrase of Johnny Bravo?",
            image: '../../public/images/johnny-bravo.jpg',
            options: ["'Hey there, pretty mama!'", "'Lookin' good!'", "'Whoa, mama!'", "'Good to see ya!'"],
            answer: "'Hey there, pretty mama!'"
        },
        {
            id: 8,
            question: "What is the name of Chuckie Finster's dad in 'Rugrats'?",
            image: '../../public/images/chas.jpg',
            options: ["Drew", "Stu", "Howard", "Chas"],
            answer: "Chas"
        },
        {
            id: 9,
            question: "What is the name of the character who is always trying to steal the Krabby Patty secret formula?",
            image: '../../public/images/plankton.jpg',
            options: ["Larry the Lobster", "Plankton", "Pearl", "Mermaid Man"],
            answer: "Plankton"
        },
        {
            id: 10,
            question: "What is the name of the stone-age family's car in 'The Flintstones'?",
            image: '../../public/images/flintmobile.jpg',
            options: ["Bedrock Buggy", "Rock-a-bye Car", "The Flintmobile", "Pebble Pusher"],
            answer: "The Flintmobile"
        },
        {
            id: 11,
            question: "Which show features a group of kids who are into extreme sports?",
            image: '../../public/images/rocket-power.jpg',
            options: ["Extreme Teens", "Rocket Power", "Skater Boys", "Thrill Seekers"],
            answer: "Rocket Power"
        },
        {
            id: 12,
            question: "What is the name of the recurring mouse character who is Tom's nephew?",
            image: '../../public/images/tuffy.jpg',
            options: ["Tuffy", "Cheddar", "Nibbles", "Whiskers"],
            answer: "Tuffy"
        },
        {
            id: 13,
            question: "What is the name of CatDog's neighbor and best friend, a blue mouse?",
            image: '../../public/images/winslow.jpg',
            options: ["Larry the Rat", "Winslow T. Oddfellow", "Chester Cheese", "Marty Mouse"],
            answer: "Winslow T. Oddfellow"
        },
        {
            id: 14,
            question: "What is the name of the robotic maid in 'The Jetsons'?",
            image: '../../public/images/rosie.jpg',
            options: ["Rosie", "Roberta", "Robo-Maid", "Roxanne"],
            answer: "Rosie"
        },
        {
            id: 15,
            question: "What is the name of the main antagonist in 'Inspector Gadget', who is a criminal mastermind?",
            image: '../../public/images/dr-claw.jpg',
            options: ["Baron von Badguy", "Professor Chaos", "The Mastermind", "Dr. Claw"],
            answer: "Dr. Claw"
        },
        {
            id: 16,
            question: "What is the name of the main character in 'The Fairly OddParents' who has two fairy godparents?",
            image: '../../public/images/timmy.jpg',
            options: ["Tommy", "Timmy", "Jimmy", "Bobby"],
            answer: "Timmy"
        },
        {
            id: 17,
            question: "What is the name of the main character in 'The Angry Beavers' who is known for his neurotic behavior?",
            image: '../../public/images/norbert.jpg',
            options: ["Daggett", "Barry", "Norbert", "Benny"],
            answer: "Norbert"
        },
        {
            id: 18,
            question: "Which character in 'Powerpuff Girls' is known for creating various inventions and gadgets?",
            image: '../../public/images/powerpuff-girls.jpg',
            options: ["Professor Utonium", "Mojo Jojo", "Mayor of Townsville", "Him"],
            answer: "Professor Utonium"
        },
        {
            id: 19,
            question: "In 'DuckTales,' what are the names of Huey, Dewey, and Louie's wealthy uncle?",
            image: '../../public/images/ducktales.jpg',
            options: ["Darkwing Duck", "Launchpad McQuack", "Scrooge McDuck", "Gyro Gearloose"],
            answer: "Scrooge McDuck"
        },
        {
            id: 20,
            question: "Which character in 'Aaahh!!! Real Monsters' is known for holding his eyes in his hands?",
            image: '../../public/images/real-monsters.jpg',
            options: ["Ickis", "Oblina", "Krumm", "The Gromble"],
            answer: "Krumm"
        },
    ]

    // Test this one question before adding more


    // Timer
    useEffect(() => {
        let timerInterval;

        if (!showResult) {
            timerInterval = setInterval(() => {
                setTimeLeft(prevTimeLeft => {
                    if (prevTimeLeft <= 0 || currentQuestionIndex >= questions.length) {
                        clearInterval(timerInterval);
                        setShowResult(true);
                        return 0;
                    }
                    return prevTimeLeft - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [currentQuestionIndex, questions.length, showResult]);

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

    // Restart - Reset to 5 min/300 sec - Reset to  first question - Reset score to 0
    const handleRestart = () => {
        setTimeLeft(10);
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
                return prevTimeLeft - 0;
            });
        }, 1000);
    };


    // useEffect function to prevent re-rendering
    useEffect(() => {
        if (showResult) {
            // High Scores
            const addHighScore = async () => {
                const userScore = score;
                const userName = "User";
                setHighScores([...highScores, { userName, userScore }]);

                console.log(score);

                await addScoreToUser({ variables: { score }});

                setTimeout(() => {
                    navigate('/highscores');
                }, 2000);
            };

            addHighScore();
        }
    }, [showResult]);

    if (currentQuestionIndex > questions.length) {
        setShowResult(true);
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
                                        <Link to={`/highscores`}></Link>
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