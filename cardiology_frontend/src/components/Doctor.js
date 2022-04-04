import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsreport from "@jsreport/browser-client";
// Components
import UserHeroImage from "./UserHeroImage";
import Grid from "./Grid";
import PatientThumb from "./PatientThumb";
import ButtonDark from "./ButtonDark";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// Hook
import { useDoctorFetch } from "../hooks/useDoctorFetch";
import { usePatientsFetch } from "../hooks/usePatientsFetch";
import { useDoctorsFetch } from "../hooks/useDoctorsFetch";
import { useHospitalFetch } from "../hooks/useHospitalFetch";
// Styles
import { ButtonsWrapper, ActionButtons, Content } from "./Users.styles";
// Images
import UserPic from "../images/userpic.png";

const Doctor = () => {
  const { state: doctorInfo, loading, error } = useDoctorFetch(localStorage.userId);
  const { state: patients } = usePatientsFetch();
  const { state: hospital } = useHospitalFetch(localStorage.userHosp);

  const navigate = useNavigate();

  const handlePatients = () => {
    navigate('/patients-list');
  }

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
      {localStorage.userRol != 'doctor' && (
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
            userId={doctorInfo[0].id}
          />
          <br/>
          <Content>
            <div className="infoColumn">
              <h1>Hospital: {hospital.name}</h1>
            </div>
            <div className="infoColumn">
              <h1>Phone Number: {doctorInfo[0].phoneNumber}</h1>
            </div>
          </Content>
          <ButtonsWrapper>
            <ActionButtons>
              <div className="button">
                <ButtonDark text="Patients" callback={() => navigate('/patients-list')} />
              </div>
              <div className="button">
                <ButtonDark text="Parameters" callback={() => navigate('/parameters')} />
              </div>
              <div className="button">
                <ButtonDark text="Templates" callback={() => navigate('/templates')} />
              </div>
            </ActionButtons>
          </ButtonsWrapper>
          {/* <Grid header='Patients'>
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
          </Grid> */}
        </>
      ) : null}
    </>
  )
}

export default Doctor;
