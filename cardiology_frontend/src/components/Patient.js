import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import UserHeroImage from "./UserHeroImage";
import ButtonDark from "./ButtonDark";
// Hook
import { usePatientFetch } from "../hooks/usePatientFetch";
// Styles
import { Content } from "./Users.styles";
// Images
import UserPic from "../images/userpic.png";

const Patient = () => {
  const { state: patientInfo, loading, error } = usePatientFetch(localStorage.userId, 'profile');

  const navigate = useNavigate();

  const handleFollowUps = () => {
    navigate(`/my-followups/${patientInfo[0].id}`);
  }

  const handleChats = () => {
    navigate(`/chats-visualizer/${patientInfo[0].id}`);
  }

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
      {localStorage.userId && patientInfo[0] && (
        localStorage.setItem('userHosp', patientInfo[0].hospital_id)
      )}
      {localStorage.userId && patientInfo[0] && (
        sessionStorage.setItem('patientId', patientInfo[0].id)
      )}
      {patientInfo[0] != null ? (
        <>
          <UserHeroImage
            userPic={patientInfo[0].img == null
              ? UserPic
              : patientInfo[0].img.url}
            name={patientInfo[0].name}
          />
          <Content>
            <div className="infoColumn">
              <h1>Clinic Record: {patientInfo[0].clinicRecord}</h1>
              <h1>Gender: {patientInfo[0].gender}</h1>
            </div>
            <div className="infoColumn">
              <h1>Birth Date: {patientInfo[0].birthDate}</h1>
              <h1>Phone Number: {patientInfo[0].phoneNumber}</h1>
            </div>
          </Content>
          <ButtonDark text='Follow-Ups' callback={handleFollowUps} />
          <ButtonDark text='Chats' callback={handleChats} />
        </>
      ) : null}
    </>
  )
}

export default Patient;