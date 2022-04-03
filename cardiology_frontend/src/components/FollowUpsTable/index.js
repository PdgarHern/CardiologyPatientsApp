import React from "react";
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

  const navigate = useNavigate();

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
                <th>Start Date</th>
                <th>End Date</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {followUps.results.map(followUp => (
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
