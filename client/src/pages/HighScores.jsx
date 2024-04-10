import "semantic-ui-css/semantic.min.css"; // Import css
import { Container, Header } from "semantic-ui-react";
import highscoresbackground from '../../public/images/highscoresbackground.jpg';
import { useQuery, gql } from '@apollo/client';

const GET_SCORE = gql`
    query Users {
      users {
        _id
        gameTag
        scores
      }
    }
`;

const HighScoresPage = () => {
    const { loading, error, data } = useQuery(GET_SCORE);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

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
                    {data.users.map((user) => (
                        <li key={user._id} value={user.scores} style={{ fontSize: "50px", marginBottom: "40px" }}>
                            {user.scores}
                        </li>
                    ))}
                </ul>
            </Container>
        </div>
    );
};

export default HighScoresPage;