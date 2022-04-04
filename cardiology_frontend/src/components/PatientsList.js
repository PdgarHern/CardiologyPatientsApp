import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
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

  const [sortedField, setSortedField] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [sortedTableRows, setSortedTableRows] = useState([]);

  const navigate = useNavigate();

  let sortedPatients = [...patients.results];

  useEffect(() => {
    if (patients !== null) {
      sortedPatients = [...patients.results];
      setSortedTableRows(sortedPatients);
    }
  }, [patients]);

  useEffect(() => {
    if (sortedField !== '') {
      sortedPatients.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          setSortedTableRows(sortedPatients);
          return sortDirection === 'asc' ? -1 : 1;

        }
        if (a[sortedField] > b[sortedField]) {
          setSortedTableRows(sortedPatients);
          return sortDirection === 'asc' ? 1 : -1;

        }
        setSortedTableRows(sortedPatients);
        return 0;

      });

    }

  }, [sortedField, sortDirection]);

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
                <th onClick={() => {
                  setSortedField('clinicRecord');
                  if (sortDirection === '' || sortDirection === 'desc' || sortedField !== 'clinicRecord') {
                    setSortDirection('asc');
                  } else {
                    setSortDirection('desc');
                  }
                }}>Clinic Record {
                    sortDirection !== '' && sortedField === 'clinicRecord'
                      ? sortDirection === 'desc'
                        ? '▼'
                        : '▲'
                      : null}</th>
                <th onClick={() => {
                  setSortedField('name');
                  if (sortDirection === '' || sortDirection === 'desc' || sortedField !== 'name') {
                    setSortDirection('asc');
                  } else {
                    setSortDirection('desc');
                  }
                }}>Name {
                    sortDirection !== '' && sortedField === 'name'
                      ? sortDirection === 'desc'
                        ? '▼'
                        : '▲'
                      : null}</th>
                <th onClick={() => {
                  setSortedField('birthDate');
                  if (sortDirection === '' || sortDirection === 'desc' || sortedField !== 'birthDate') {
                    setSortDirection('asc');
                  } else {
                    setSortDirection('desc');
                  }
                }}>Birth Date {
                    sortDirection !== '' && sortedField === 'birthDate'
                      ? sortDirection === 'desc'
                        ? '▼'
                        : '▲'
                      : null}</th>
                <th>Gender</th>
                <th>Phone Number</th>
              </thead>
              <tbody>
                {sortedTableRows.map(patient => (
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
