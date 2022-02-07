import React from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../API";

const Doctor = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await API.logout();

    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRol');

    navigate('/');
  }

  return (
    <>
      <h1>Doctor</h1>
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

export default Doctor;