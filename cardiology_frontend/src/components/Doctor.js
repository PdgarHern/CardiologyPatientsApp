import React from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../API";
// Hook
import { useDoctorFetch } from "../hooks/useDoctorFetch";

const Doctor = () => {
  const { state: doctorInfo, loading, error } = useDoctorFetch(localStorage.userId);

  const navigate = useNavigate();

  const handleAuth = () => {
    navigate('/login');
  }

  return (
    <>
      {!localStorage.userId && (
        handleAuth()
      )}
      <h1>Doctor</h1>
      {localStorage.userId ? (
        <p>Logged in</p>
      ) : (
        <p>Not logged in</p>
      )}
      {doctorInfo[0] != null ? (
        <>
          <h1>{doctorInfo[0].name}</h1>
        </>
      ) : null}
    </>
  )
}

export default Doctor;
