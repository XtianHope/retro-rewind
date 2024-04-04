import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Menu } from 'semantic-ui-react';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (name) => {
    setActiveItem(name);
  };

  const logout = () => {
    Auth.logout();
  };

  return (
    <Menu tabular>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={() => handleItemClick('home')}
        as={Link}
        to="/"
      />
      {Auth.loggedIn() ? (
        <>
          <Menu.Item
            name='profile'
            active={activeItem === 'profile'}
            onClick={() => handleItemClick('profile')}
            as={Link}
            to="/me"
          />
          
          <Menu.Item
            name='trivia'
            active={activeItem === 'trivia'}
            onClick={() => handleItemClick('trivia')}
            as={Link}
            to="/trivia"
          />

<Menu.Item
            name='highScores'
            active={activeItem === 'highScores'}
            onClick={() => handleItemClick('highScores')}
            as={Link}
            to="/highScores"
          />




          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              onClick={logout}
            />
          </Menu.Menu>
        </>
      ) : (
        <>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={() => handleItemClick('login')}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name='signup'
            active={activeItem === 'signup'}
            onClick={() => handleItemClick('signup')}
            as={Link}
            to="/signup"
          />
        </>
      )}
    </Menu>
  );
};

export default Navbar;




















