import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Components
import ButtonDark from "../ButtonDark";
import SearchBar from "../SearchBar";
// Hook
import { useFollowUpsFetch } from "../../hooks/useFollowUpsFetch";
// Styles 
import { Wrapper } from "./FollowUpsTable.styles";

const FollowUpsTable = ({ id, patient }) => {
  const { state: followUps, searchTerm, setSearchTerm, setIsLoadingMore } = useFollowUpsFetch(id);

  const [sortedField, setSortedField] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [sortedTableRows, setSortedTableRows] = useState([]);

  const navigate = useNavigate();

  let sortedFollowUps = [...followUps.results];

  useEffect(() => {
    if (followUps !== null) {
      sortedFollowUps = [...followUps.results];
      setSortedTableRows(sortedFollowUps);
    }
  }, [followUps]);

  useEffect(() => {
    if (sortedField !== '') {
      sortedFollowUps.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          setSortedTableRows(sortedFollowUps);
          return sortDirection === 'asc' ? -1 : 1;

        }
        if (a[sortedField] > b[sortedField]) {
          setSortedTableRows(sortedFollowUps);
          return sortDirection === 'asc' ? 1 : -1;

        }
        setSortedTableRows(sortedFollowUps);
        return 0;

      });

    }

  }, [sortedField, sortDirection])

  const handleClick = (e) => {
    navigate(`/followup/${e.currentTarget.dataset.value}`);
  }

  return (
    <>
      {followUps && (
        <Wrapper>
          <h1>Follow-Ups</h1>
          <SearchBar placeholder={"Search by Start Date"} setSearchTerm={setSearchTerm} />
          <table className="table table-striped table-hover table-border table-bordered">
            <thead>
              <tr>
                <th onClick={() => {
                  setSortedField('startDate');
                  if (sortDirection === '' || sortDirection === 'desc' || sortedField !== 'startDate') {
                    setSortDirection('asc');
                  } else {
                    setSortDirection('desc');
                  }
                }}>Start Date {
                    sortDirection !== '' && sortedField === 'startDate'
                      ? sortDirection === 'desc'
                        ? '▼'
                        : '▲'
                      : null}</th>
                <th onClick={() => {
                  setSortedField('endDate');
                  if (sortDirection === '' || sortDirection === 'desc' || sortedField !== 'endDate') {
                    setSortDirection('asc');
                  } else {
                    setSortDirection('desc');
                  }
                }}>End Date {
                  sortDirection !== '' && sortedField === 'endDate'
                    ? sortDirection === 'desc'
                      ? '▼'
                      : '▲'
                    : null}</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {sortedTableRows.map(followUp => (
                <tr onClick={handleClick} data-value={followUp.id}>
                  <td>{followUp.startDate}</td>
                  <td>{followUp.endDate}</td>
                  <td>{followUp.doctor.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {followUps.page < followUps.total_pages && (
            <div className="loadMoreButton">
              <ButtonDark text="Load More" callback={() => setIsLoadingMore(true)} />
            </div>
          )}
        </Wrapper>
      )}
    </>
  )
}

export default FollowUpsTable;
