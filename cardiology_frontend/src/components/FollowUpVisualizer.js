import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// API
import API from "../API";
// Components
import BreadCrumb from "./BreadCrumb";
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
// Hook
import { useFollowUpFetch } from "../hooks/useFollowUpFetch";
// Styles
import { Wrapper, Content } from "./Followups.styles";

const FollowUpVisualizer = () => {
  const { followupId } = useParams();
  const { state: followUp, loading, setLoading, error, setError } = useFollowUpFetch(followupId);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoading(true);

      await API.deleteFollowUp(followupId);

      setLoading(false);

      navigate(`/patient/${sessionStorage.patientId}`);

    } catch (error) {
      setError(true);
    }
  }

  return (
    <>
      <BreadCrumb text="Follow-Up" linkPath={`/patient/${sessionStorage.patientId}`} />
      <Wrapper>
        {error && <div className="formError">Something went wrong...</div>}
        {!loading && !error ? (
          <>
            <h1>Follow-Up</h1>
            <Content>
              {followUp && (
                <>
                  <div className="column">
                    <h2>Start Date: <p>{followUp.startDate}</p> </h2>
                  </div>
                  <div className="column">
                    <h2>End Date: <p>{followUp.endDate}</p> </h2>
                  </div>
                  <div className="column">
                    <h2>Doctor: <p>{followUp.doctor.name}</p> </h2>
                  </div>
                </>
              )}
            </Content>

            <br />
            <h1>Parameters</h1>
            <table className="table table-striped table-hover table-border table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Kind</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {followUp.followuptemplate.parameters.map(parameter => (
                  <tr>
                    <td id="id">{parameter.id}</td>
                    <td>{parameter.name}</td>
                    <td>{parameter.kind}</td>
                    <td>{parameter.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br/>
            <ButtonDark text='Delete' callback={handleDelete} />
          </>
        ) : (
          <Spinner />
        )}

      </Wrapper>
    </>
  )
}

export default FollowUpVisualizer;
