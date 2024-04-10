import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

import UserList from "../components/UserList";
import { MagnifyingGlass } from 'react-loader-spinner'
import "semantic-ui-css/semantic.min.css"; // Import css library
import { Container, Header } from 'semantic-ui-react';
import homebackground from '../../public/images/homebackground.png';
// import { Helmet } from 'react-Helmet';
// import "../assets/css/home.css"

function Home() {
  const { data, loading, error } = useQuery(QUERY_USERS);

  const users = data?.users || [];

  if (error) {
    throw Error(error);
  }

  if (loading) {
    return <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 300
      }}
    >
      <h2> <MagnifyingGlass
        visible={true}
        height="200"
        width="200"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#C0EFFF"
        color="brown"
      /></h2>
    </div>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${homebackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Honk'
      }}
    >
      <Container
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}
      >
          
        <Header as="h1"  style={{ fontSize: '127px', fontWeight: 'bold', fontFamily: 'Honk'}}>
          RETRO-REWIND
          <div className="image">
            <img src='../../images/rewindButtonIcon.png' width={'120px'} alt="rewind button" />
          </div>
        </Header>
        <Header as="h2" style={{ textAlign: 'left', fontSize: '36px' }}>
          Recent Users
        </Header>
        <div style={{ textAlign: 'left', fontSize: '24px', fontamily: 'Honk' }}>
          <UserList users={users} />
        </div>
      </Container>
    </div>
  );
}

export default Home;