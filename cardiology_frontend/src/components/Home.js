import React from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../API";

const Home = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogin = () => {
    navigate('/login');
  }

  const handleLogout = async () => {
    await API.logout();

    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');

    window.location.reload();
  }

  return (
    <>
      <p>Home Component</p>
      <input
        type='button'
        onClick={handleRegister}
        value='Register'
      />
      <input
        type='button'
        onClick={handleLogin}
        value='Login'
      />
      <input
        type='button'
        onClick={handleLogout}
        value='Logout'
      />
      {localStorage.userId ? (
        <p>Logged in</p>
      ) : (
        <p>Not logged in</p>
      )}
    </>
    
  )
}

export default Home;
