import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../../API";
// Components
import ButtonDark from "../ButtonDark";
// Hook
import { useParametersFetch } from "../../hooks/useParametersFetch";
// Styles 
import { Wrapper } from "./ParametersTable.styles";
import { API_URL } from "../../config";

const ParametersTable = ({ updatable, templateId }) => {
  const { state: parameters } = useParametersFetch();

  const [parameterId, setParameterId] = useState('');

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (updatable) {
      navigate(`/put-parameter/${e.currentTarget.textContent[0]}`);

    } else {
      setParameterId(e.currentTarget.textContent[0]);
      sessionStorage.setItem('parameterId', e.currentTarget.textContent[0]);
    }

  }

  const handleAdd = async () => {
    try {

      const formData = new FormData();

      formData.append('followuptemplates_parameter[followuptemplate_id]', templateId);
      formData.append('followuptemplates_parameter[parameter_id]', parameterId);

      await API.createTemplateParam(formData);

      setParameterId('');

      window.location.reload();

    } catch (error) {

    }
  }

  return (
    <>
      {parameters && (
        <>
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
          {parameterId != '' && (
            <ButtonDark text="Add Parameter" callback={handleAdd} />
          )}
        </>
      )}
    </>
  )
}

export default ParametersTable;
