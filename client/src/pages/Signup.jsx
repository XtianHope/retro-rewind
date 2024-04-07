import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import questionablecartoons from '../../public/images/questionablecartoons.jpg';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    gameTag: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const renderForm = () => {
    if (data) {
      return (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      )
    }
    return (
      <form onSubmit={handleFormSubmit} style={{ display: 'flex'}}>
        <input
          placeholder="Your username"
          name="username"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        <input
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <input
          placeholder="Your gamertag"
          name="gameTag"
          type="text"
          value={formState.gameTag}
          onChange={handleChange}
        />
        <div>
        <button type="submit">
          Submit</button>
          </div>
      </form>
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${questionablecartoons})`,
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
          width: "70%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "150px",
          borderRadius: "10px",
        }}
      >
        <main>
          <h4 style={{ fontSize: 50, fontFamily: 'times new roman'}}>Sign Up</h4>
          <div
          style={{
            width:'100%',
            height:'100%',
            fontSize:'20px'
          }}>
            {renderForm()}
            {error && <div>{error.message}</div>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Signup;