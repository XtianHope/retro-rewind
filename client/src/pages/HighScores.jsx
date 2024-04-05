import { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css"; // Import css
import { Container, Header } from "semantic-ui-react";
import highscoresbackground from '../../public/images/highscoresbackground.jpg';

const HighScoresPage = () => {

    const [highScores, setHighScores] = useState([]);
    const fetchHighScores = async () => {
        try {
            const response = await fetch("/api/highscores");
            if (response.ok) {
                const data = await response.json();
                setHighScores(data);
            } else {
                console.error("Failed to fetch high scores:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching high scores:", error.message);
        }
    };

    // useEffect hook to fetch high scores
    useEffect(() => {
        fetchHighScores();
    }, []);

    return (
        <div
            style={{
                backgroundImage: `url(${highscoresbackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Container
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center"
                }}
            >
                <Header as="h1" style={{ fontSize: "150px", marginBottom: "40px" }}>
                    High Scores
                </Header>
                <ul>
                    {/* Map over the high scores and render each score as a list item */}
                    {highScores.map((score, index) => (
                        <li key={index}>
                            {score.name}: {score.score}
                        </li>
                    ))}
                </ul>
            </Container>
        </div>
    );
};

export default HighScoresPage;