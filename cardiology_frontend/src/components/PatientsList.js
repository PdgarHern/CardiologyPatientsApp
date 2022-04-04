import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";
//import { useTable, useSortBy } from "react-table";
// Components
import BreadCrumb from "./BreadCrumb";
import SearchBar from "./SearchBar";
import ButtonDark from "./ButtonDark";
// Hooks
import { usePatientsFetch } from "../hooks/usePatientsFetch";
// Styles
import { Wrapper } from "./Lists.styles";

const PatientsList = () => {
  const { state: patients, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = usePatientsFetch();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    sessionStorage.setItem('patientId', e.currentTarget.dataset.value);
    navigate(`/patient/${e.currentTarget.dataset.value}`);
  }

  const handleAuth = () => {
    navigate("/");
  }

  return (
    <>
      {localStorage.userRol != "doctor" && (
        handleAuth()
      )}
      <BreadCrumb text="Patients List" linkPath={`/doctor-profile/${localStorage.userId}`} />
      <Wrapper>
        <h1>Patients</h1>
        <div className="addPatientButton">
          <ButtonDark text="Add patient" callback={() => navigate("/register-patient")} />
        </div>
        {patients && (
          <>
            <SearchBar placeholder={"Search Patient"} setSearchTerm={setSearchTerm} />
            <table className="table">
              <thead>
                <th>Clinic Record</th>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Gender</th>
                <th>Phone Number</th>
              </thead>
              <tbody>
                {patients.results.map(patient => (
                  <>
                    {patient.hospital_id == localStorage.userHosp && (
                      <tr onClick={handleClick} data-value={patient.id}>
                        <td>{patient.clinicRecord}</td>
                        <td>{patient.name}</td>
                        <td>{patient.birthDate}</td>
                        <td>{patient.gender}</td>
                        <td>{patient.phoneNumber}</td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
            {patients.page < patients.total_pages && !loading && (
              <div className="loadMoreButton">
                <ButtonDark text="Load More" callback={() => setIsLoadingMore(true)} />
              </div>
            )}
          </>
        )}
      </Wrapper>
    </>
  )
}

export default PatientsList;
