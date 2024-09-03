import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext)
  const navigate = useNavigate();


  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
    
  }, []);

  function logout(){
    fetch('http://localhost:4000/logout', {
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
      <Link to="/" className="logo">LJ-TechBlog</Link>
      <span className='hello-user'>{username ? `Hello ${username}` : ''}</span>
      <nav>
        {username && ( 
          <>
            <Link to="/create">Create New Post</Link>
            <a onClick={logout}>Logout</a>
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
