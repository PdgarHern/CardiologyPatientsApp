import React from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../API";
// Hook
import { usePatientFetch } from "../hooks/usePatientFetch";

const Patient = () => {
  const { state: patientInfo, loading, error } = usePatientFetch(localStorage.userId);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await API.logout();

    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRol');

    navigate('/');
  }

  const handleAuth = () => {
    navigate('/login');
  }

  return (
    <>
      {!localStorage.userId && (
        handleAuth()
      )}
      <h1>Patient</h1>
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
      {patientInfo[0] != null ? (
        <>
          <h1>{patientInfo[0].name}</h1>
        </>
      ) : null}
    </>
  )
}

export default Patient;