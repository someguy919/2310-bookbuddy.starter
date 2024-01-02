import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import bookLogo from './assets/books.png';
import Navigations from './components/Navigations';
import Books from './components/Books';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import SuccessRegi from './components/SuccessRegi';
import Homepage from './components/Homepage';
import SingleBook from './components/SingleBook';
import CheckedOutBooks from './components/CheckedOutBooks.jsx';
import AboutUs from './components/About.jsx';


function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState({});
    const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const fetchUserData = async () => {
      if (token) {
        try {
          const userResponse = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          setUser(userResponse.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchBooks();
    fetchUserData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser({});
  };
  const userStatus = token && user.email ? `Logged in as: ${user.email}` : 'Logged in as: Guest';

  return (
      <>
          <div className="header-container">
              <h1>
                  <img id='logo-image' src={bookLogo} alt="Library Logo" />
                  <Link to='/'>Library App</Link>
              </h1>
              <div className="user-status">{userStatus}</div>
          </div>
          <Navigations user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Homepage user={user} />} />
        <Route path='/successReg' element={<SuccessRegi />} />
        <Route path='/books' element={<Books books={books} />} />
        <Route path='/books/:id' element={<SingleBook token={token} />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account' element={token ? <Account user={user} setUser={setUser} setToken={setToken} /> : <Login setToken={setToken} />} />
        <Route path='/checked-out' element={<CheckedOutBooks token={token} />} />
        <Route path='/about' element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
