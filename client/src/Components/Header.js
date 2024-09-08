import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext)
  const navigate = useNavigate();


  useEffect(() => {
    fetch('http://localhost:4000/auth/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
    
  }, []);

  // The logout function invalidates the cookie.
  function logout(){
    fetch('http://localhost:4000/auth/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
      navigate('/login')
    })
    setUserInfo(null);
  }

  const username = userInfo?.username;
  
  return (
    <header className='header-bar'>
      <div className='logo-container'>
        <img src='/ryan.jpeg' alt='logo' className='logo-image'/>
        <Link to="/" className="logo">Remembering Ryan</Link>
      </div>
      <span className='hello-user'>{username ? `Hello, ${username}.` : ''}</span>
      <nav className='links'>
        {username && ( 
          <>
            <Link to="/create">Create Post</Link>
            <Link to="/" onClick={logout}>Logout</Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>  
            <Link to="/register">Register</Link>
          </>
        )}
        
      </nav>
    </header>
  );
}

export default Header;
