import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// Components
import BreadCrumb from "./BreadCrumb";
import ChatsTable from "./ChatsTable";

const ChatsVisualizer = () => {
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
      <BreadCrumb text='Chats list' linkPath={`/patient-profile/${patientId}`} />
      <ChatsTable id={patientId} />
    </>
  )
}

export default ChatsVisualizer;
