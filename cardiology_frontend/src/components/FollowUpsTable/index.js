import React from "react";
// Hook
import { useFollowUpsFetch } from "../../hooks/useFollowUpsFetch";
// Styles 
import { Wrapper } from "./FollowUpsTable.styles";

const FollowUpsTable = ({ id }) => {
  const { state: followUps } = useFollowUpsFetch(id);

  const handleClick = (e) => {
    console.log(e.currentTarget.textContent[0]);
  }

  return (
    <>
      {followUps && (
        <Wrapper>
        <h1>Follow-Ups</h1>
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
              <tr onClick={handleClick}>
                <td id="id">{followUp.id}</td>
                <td>{followUp.startDate}</td>
                <td>{followUp.endDate}</td>
                <td>{followUp.doctor.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Wrapper>
      )}
    </>
  )
}

export default FollowUpsTable;
