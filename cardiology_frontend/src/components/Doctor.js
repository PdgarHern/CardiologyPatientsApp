import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import UserHeroImage from "./UserHeroImage";
import Grid from "./Grid";
import PatientThumb from "./PatientThumb";
// Hook
import { useDoctorFetch } from "../hooks/useDoctorFetch";
import { usePatientsFetch } from "../hooks/usePatientsFetch";
import { useHospitalFetch } from "../hooks/useHospitalFetch";
// Styles
import { Content } from "./Users.styles";
// Images
import UserPic from "../images/userpic.png";

const Doctor = () => {
  const { state: doctorInfo, loading, error } = useDoctorFetch(localStorage.userId);
  const { state: patients } = usePatientsFetch();
  const { state: hospital } = useHospitalFetch(localStorage.userHosp);
  

  const navigate = useNavigate();

  const handleAuth = () => {
    navigate('/login');
  }

  return (
    <>
      {!localStorage.userId && (
        handleAuth()
      )}
      {localStorage.userId && doctorInfo[0] && (
        localStorage.setItem('userHosp', doctorInfo[0].hospital_id)
      )}
      {doctorInfo[0] != null ? (
        <>
          <UserHeroImage
            userPic={doctorInfo[0].img == null
              ? UserPic
              : doctorInfo[0].img.url}
            name={doctorInfo[0].name}
          />
          <Content>
            <div className="infoColumn">
              <h1>Hospital: {hospital.name}</h1>
            </div>
            <div className="infoColumn">
              <h1>Phone Number: {doctorInfo[0].phoneNumber}</h1>
            </div>
          </Content>
          <br/>
          <Grid header='Patients'>
            {patients.results.map(patient => (
              <PatientThumb
                key={patient.id}
                id={patient.id}
                name={patient.name}
                imageUrl={
                  patient.img
                    ? patient.img.url
                    : UserPic
                
                }
                clickable
              />
            ))}
          </Grid>
        </>
      ) : null}
    </>
  )
}

export default Doctor;
