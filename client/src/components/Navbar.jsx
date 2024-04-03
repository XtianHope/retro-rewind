import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { MenuItem, Menu } from 'semantic-ui-react';
class Navbar extends React.Component {
  state = { activeItem: 'home' };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state;
    const logout = (event) => {
      event.preventDefault();
      Auth.logout();
    };
    if (Auth.loggedIn()) {
      return (
        <h1>
          <Menu tabular>
            <MenuItem
              name='home'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            <Link to="/me">
              <MenuItem
                name='profile'
                active={activeItem === 'profile'}
                onClick={this.handleItemClick}
              />
              {/* {Auth.getProfile().data.username}'s profile */}
            </Link>
            <Link to="/trivia">
              <MenuItem
                name='trivia'
                active={activeItem === 'trivia'}
                onClick={this.handleItemClick}
              />
            </Link>
          </Menu>
          <button onClick={logout}>
            Logout
          </button>
        </h1>
      );
    }
    // If logged out show login controls
    return (
      <Menu tabular>
        <MenuItem
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <MenuItem
          name='login'
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
        />
        <MenuItem
          name='signup'
          active={activeItem === 'signup'}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
export default Navbar;





















