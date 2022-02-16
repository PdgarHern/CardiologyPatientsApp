import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// Components
import FollowUpsTable from "./FollowUpsTable";
// Styles
import { Wrapper, Content } from "./Users.styles";

const PatientFollowUps = () => {
  const { patientId } = useParams();

  const navigate = useNavigate();

  const handleAuth = () => {
    navigate('/login');
  }

  return (
    <>
      {!localStorage.userId && (
        handleAuth()
      )}
      {localStorage.userRol != 'patient' && (
        handleAuth()
      )}
      {sessionStorage.setItem('patientId', patientId)}
      <FollowUpsTable id={patientId} patient={true} />
    </>
  )
}

export default PatientFollowUps;
