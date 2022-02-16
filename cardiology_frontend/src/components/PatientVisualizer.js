import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// Components
import ButtonDark from "./ButtonDark";
import BreadCrumb from "./BreadCrumb";
import HeroImage from "./HeroImage";
import FollowUpsTable from "./FollowUpsTable";
// Hook
import { usePatientFetch } from "../hooks/usePatientFetch";
// Styles

// Images
import UserPic from "../images/userpic.png";

const PatientVisualizer = () => {
  const { patientId } = useParams();
  const { state: patient } = usePatientFetch(patientId, 'visualize');

  const navigate = useNavigate();

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
      {patient && (
        <>
          <BreadCrumb text={patient.name} linkPath={`/doctor-profile/${localStorage.userId}`} />
          <HeroImage 
            userPic={patient.img == null
              ? UserPic
              : patient.img.url}
            name={patient.name}
          />
          <FollowUpsTable id={patientId} />
        </>
        
      )}
    </>
  )
}

export default PatientVisualizer;
