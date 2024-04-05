import { useState, useEffect } from "react";

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
        <div>
            <h1>High Scores</h1>
            <h2>{score}</h2>
            <ul>
                {/* Map over the high scores and render each score as a list item */}
                {highScores.map((score, index) => (
                    <li key={index}>
                        {score.name}: {score.score}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HighScoresPage;