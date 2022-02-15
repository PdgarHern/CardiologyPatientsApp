import React from "react";
import { useParams } from "react-router-dom";
// Components
import FollowUpsTable from "./FollowUpsTable";
// Styles
import { Wrapper, Content } from "./Users.styles";

const PatientFollowUps = () => {
  const { patientId } = useParams();

  return (
    <>
      {sessionStorage.setItem('patientId', patientId)}
      <FollowUpsTable id={patientId} patient={true} />
    </>
  )
}

export default PatientFollowUps;
