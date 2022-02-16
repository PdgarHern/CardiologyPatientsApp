import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import UserHeroImage from "./UserHeroImage";
import Grid from "./Grid";
import PatientThumb from "./PatientThumb";
import ButtonDark from "./ButtonDark";
// Hook
import { useDoctorFetch } from "../hooks/useDoctorFetch";
import { usePatientsFetch } from "../hooks/usePatientsFetch";
import { useHospitalFetch } from "../hooks/useHospitalFetch";
// Styles
import { Wrapper, Content } from "./Users.styles";
// Images
import UserPic from "../images/userpic.png";

const Doctor = () => {
  const { state: doctorInfo, loading, error } = useDoctorFetch(localStorage.userId);
  const { state: patients } = usePatientsFetch();
  const { state: hospital } = useHospitalFetch(localStorage.userHosp);
  

  const navigate = useNavigate();

  const handleParameter = () => {
    navigate('/post-parameter');
  }

  const handleTemplate = () => {
    navigate('/post-template');
  }

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
      {localStorage.userId && doctorInfo[0] && (
        sessionStorage.setItem('doctorId', doctorInfo[0].id)
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
          <Wrapper>
            <div className="actionButtons">
              <ButtonDark text="Parameters" callback={handleParameter} />
              <ButtonDark text="Templates" callback={handleTemplate} />
            </div>
          </Wrapper>
          <Grid header='Patients'>
            {patients.results.map(patient => (
              <>
              {patient.hospital_id == localStorage.userHosp ? (
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
              ) : null}
              </>
            ))}
          </Grid>
        </>
      ) : null}
    </>
  )
}

export default Doctor;
