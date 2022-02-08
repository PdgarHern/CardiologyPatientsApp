import React from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../API";
// Components
import UserHeroImage from "./UserHeroImage";
// Hook
import { useDoctorFetch } from "../hooks/useDoctorFetch";
// Styles
import { Content } from "./Users.styles";
// Images
import UserPic from "../images/userpic.png";

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
      {doctorInfo[0] != null ? (
        <>
          <UserHeroImage
            userPic={doctorInfo[0].img.url == null
              ? UserPic
              : doctorInfo[0].img.url}
            name={doctorInfo[0].name}
          />
          <Content>
            <div className="infoColumn">
              <h1>Phone Number: {doctorInfo[0].phoneNumber}</h1>
            </div>
            <div className="infoColumn"></div>
          </Content>
        </>
      ) : null}
    </>
  )
}

export default Doctor;
