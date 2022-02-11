import React from "react";
import { useNavigate } from "react-router-dom";
// Hook
import { useParametersFetch } from "../../hooks/useParametersFetch";
// Styles 
import { Wrapper } from "./ParametersTable.styles";

const ParametersTable = () => {
  const { state: parameters } = useParametersFetch();

  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/put-parameter/${e.currentTarget.textContent[0]}`);
  }

  return (
    <>
      {parameters && (
        <Wrapper>
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
              {parameters.results.map(parameter => (
                <tr onClick={handleClick}>
                  <td id="id">{parameter.id}</td>
                  <td>{parameter.name}</td>
                  <td>{parameter.kind}</td>
                  <td>{parameter.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Wrapper>
      )}
    </>
  )
}

export default ParametersTable;
