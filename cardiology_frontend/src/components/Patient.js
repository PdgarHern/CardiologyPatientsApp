import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import UserHeroImage from "./UserHeroImage";
import ButtonDark from "./ButtonDark";
// Hook
import { usePatientFetch } from "../hooks/usePatientFetch";
// Styles
import { ButtonsWrapper, ActionButtons, Content } from "./Users.styles";
// Images
import UserPic from "../images/userpic.png";



const Patient = () => {
  const { state: patientInfo, loading, error } = usePatientFetch(localStorage.userId, 'profile');

  const navigate = useNavigate();

  const handleFollowUps = () => {
    navigate(`/my-followups/${patientInfo.results[0].id}`);
  }

  const handleChats = () => {
    navigate(`/chats-visualizer/${patientInfo.results[0].id}`);
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
      {localStorage.userId && patientInfo.results && (
        localStorage.setItem('userHosp', patientInfo.results[0].hospital_id)
      )}
      {localStorage.userId && patientInfo.results && (
        sessionStorage.setItem('patientId', patientInfo.results[0].id)
      )}
      {patientInfo.results != null ? (
        <>
          <UserHeroImage
            userPic={patientInfo.results[0].img == null
              ? UserPic
              : patientInfo.results[0].img.url}
            name={patientInfo.results[0].name}
            userId={patientInfo.results[0].id}
          />
          <Content>
            <div className="infoColumn">
              <h1>Clinic Record: {patientInfo.results[0].clinicRecord}</h1>
              <h1>Gender: {patientInfo.results[0].gender}</h1>
            </div>
            <div className="infoColumn">
              <h1>Birth Date: {patientInfo.results[0].birthDate}</h1>
              <h1>Phone Number: {patientInfo.results[0].phoneNumber}</h1>
            </div>
          </Content>
          <ButtonsWrapper>
            <ActionButtons>
              <div className="button">
                <ButtonDark text='Follow-Ups' callback={handleFollowUps} />
              </div>
              <div className="button">
                <ButtonDark text='Chats' callback={handleChats} />
              </div>
            </ActionButtons>
          </ButtonsWrapper>
        </>
      ) : null}
    </>
  )
}

export default Patient;