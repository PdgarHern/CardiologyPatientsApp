import React from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../API";
// Components
import UserHeroImage from "./UserHeroImage";
// Hook
import { usePatientFetch } from "../hooks/usePatientFetch";
// Styles
import { Content } from "./Users.styles";
// Images
import UserPic from "../images/userpic.png";

const Patient = () => {
  const { state: patientInfo, loading, error } = usePatientFetch(localStorage.userId);

  const navigate = useNavigate();

  const handleAuth = () => {
    navigate('/login');
  }

  return (
    <>
      {!localStorage.userId && (
        handleAuth()
      )}
      {localStorage.userId && patientInfo[0] && (
        localStorage.setItem('userHosp', patientInfo[0].hospital_id)
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
        </>
      ) : null}
    </>
  )
}

export default Patient;