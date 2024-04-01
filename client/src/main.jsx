import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Error from './pages/Signup.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup.jsx';
import Trivia from './pages/Trivia.jsx'; // Imported new Trivia page
import HighScoresPage from './pages/HighScores.jsx'; // Imported high scores page


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/users/:id',
        element: <Profile />
      },
      {
        path: '/me',
        element: <Profile />
      },
      {
        path: '/trivia',
        element: <Trivia /> // Added new trivia page
      },
      {
        path: '/highscores',
        element: <HighScoresPage /> // Added new high scores page
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
