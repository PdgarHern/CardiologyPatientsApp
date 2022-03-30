import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import BreadCrumb from "./BreadCrumb";
// Hooks
import { usePatientsFetch } from "../hooks/usePatientsFetch";
// Styles
import { Wrapper } from "./Lists.styles";

const PatientsList = () => {
  const { state: patients } = usePatientsFetch();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    sessionStorage.setItem('patientId', e.currentTarget.dataset.value);
    navigate(`/patient/${e.currentTarget.dataset.value}`);
  }

  return (
    <>
    <BreadCrumb text="Patients List" linkPath={"/"} />
    <Wrapper>
      <h1>Patients</h1>
      {patients && (
        <table className="table">
          <thead>
            <th>Clinic Record</th>
            <th>Birth Date</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Phone Number</th>
          </thead>
          <tbody>
            {patients.results.map(patient => (
              <>
                {patient.hospital_id == localStorage.userHosp && (
                  <tr onClick={handleClick} data-value={patient.id}>
                    <td>{patient.clinicRecord}</td>
                    <td>{patient.birthDate}</td>
                    <td>{patient.name}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.phoneNumber}</td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      )}
    </Wrapper>
    </>
  )
}

export default PatientsList;
