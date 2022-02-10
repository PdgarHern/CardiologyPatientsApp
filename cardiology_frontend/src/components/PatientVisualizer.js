import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// Components
import ButtonDark from "./ButtonDark";
// Hook
import { usePatientFetch } from "../hooks/usePatientFetch";
// Styles

// Images
import UserPic from "../images/userpic.png";

const PatientVisualizer = () => {
	const { patientId } = useParams();
	const { state: patient } = usePatientFetch(patientId, 'visualize');

  return (
		<>
			{patient && (
				<h1>{patient.name}</h1>
			)}
		</>
	)
}

export default PatientVisualizer;
