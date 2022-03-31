import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsreport from "@jsreport/browser-client";
// API
import API from "../../API";
// Components
import ButtonDark from "../ButtonDark";
import SearchBar from "../SearchBar";
// Hook
import { useParametersFetch } from "../../hooks/useParametersFetch";
// Styles 
import { Wrapper } from "./ParametersTable.styles";

const ParametersTable = ({ template, updatable, templateId }) => {
  const { state: parameters, searchTerm, setSearchTerm, setIsLoadingMore } = useParametersFetch();

  const [parameterId, setParameterId] = useState('');

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (updatable) {
      navigate(`/put-parameter/${e.currentTarget.dataset.value}`);

    } else {
      setParameterId(e.currentTarget.dataset.value);
      sessionStorage.setItem('parameterId', e.currentTarget.dataset.value);
    }

  }

  const handleAdd = async () => {
    try {

      parameters.results.map(async (parameter) => {
        if (document.getElementById(`${parameter.id}`).checked) {
          const formData = new FormData();

          formData.append('followuptemplates_parameter[followuptemplate_id]', templateId);
          formData.append('followuptemplates_parameter[parameter_id]', parameter.id);
    
          await API.createTemplateParam(formData);

        }
      })
      

      setParameterId('');

      window.location.reload();

    } catch (error) {

    }
  }

  console.log(parameters.results)

  return (
    <>
      {parameters && (
        <>
          <Wrapper>
            <h1>Parameters</h1>
            <SearchBar setSearchTerm={setSearchTerm} />
            <table className="table table-striped table-hover table-border table-bordered">
              <thead>
                <tr>
                  {template && (
                    <th></th>
                  )}
                  <th>Name</th>
                  <th>Kind</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {parameters.results.map(parameter => (
                  <>
                    {console.log(parameter)}
                    {parameter.hospital_id == localStorage.userHosp ? (
                      <tr onClick={handleClick} data-value={parameter.id}>
                        {template && (
                          <td>
                            <input id={parameter.id} className="checkbox"
                              type='checkbox'
                            />
                          </td>
                        )}
                        <td>{parameter.name}</td>
                        <td>{parameter.kind}</td>
                        <td>{parameter.frequency}</td>
                      </tr>
                    ) : null}
                  </>
                ))}
              </tbody>
            </table>
            {parameters.page < parameters.total_pages && (
              <ButtonDark text="Load More" callback={() => setIsLoadingMore(true)} />
            )}
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
