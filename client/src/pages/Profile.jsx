// Node Modules
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Utilities
import Auth from '../utils/auth';
import { QUERY_USERS, QUERY_USER, QUERY_ME } from '../utils/queries';
// Components
import UserList from '../components/UserList';
import { Container, Header, List } from 'semantic-ui-react';
import profilebackground from '../../public/images/profilebackground.jpg';

const Profile = () => {
  const { id } = useParams();

  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // Get a list of all users
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];

  if (error) console.log(error);

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Navigate to="/me" replace />;
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const renderUserList = () => {
    if (usersLoading) return null;
    const notMeUsers = users.filter(o => o._id !== user._id);
    return <UserList users={notMeUsers} title="User List" />;
  };

  const renderCurrentUserInfo = () => {
    if (id) return null;
    return (
      <List style={{ textAlign: 'left' }}>
        <List.Item style={{ paddingBottom: '40px' }}>
          <List.Header style={{ fontSize: '1.5em' }}>Username:</List.Header>
          <List.Content style={{ fontSize: '1.2em' }}>{user.username}</List.Content>
        </List.Item>
        <List.Item style={{ paddingBottom: '40px' }}>
          <List.Header style={{ fontSize: '1.5em' }}>Email:</List.Header>
          <List.Content style={{ fontSize: '1.2em' }}>{user.email}</List.Content>
        </List.Item>
        <List.Item style={{ paddingBottom: '40px' }}>
          <List.Header style={{ fontSize: '1.5em' }}>Gametag:</List.Header>
          <List.Content style={{ fontSize: '1.2em' }}>{user.gameTag}</List.Content>
        </List.Item>
      </List>
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${profilebackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '40px',
          borderRadius: '10px',
        }}
        textAlign="center"
      >
        <Header as="h1" style={{ fontSize: '100px', marginBottom: '30px' }}>
          My Profile
        </Header>
        {renderCurrentUserInfo()}
        {renderUserList()}
      </Container>
    </div>
  );
};

export default Profile;