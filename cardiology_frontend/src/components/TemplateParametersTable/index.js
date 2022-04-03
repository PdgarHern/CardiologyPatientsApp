import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../../API";
// Components
import ButtonDark from "../ButtonDark";
import SearchBar from "../SearchBar";
// Hook
import { useTemplateParamsFetch } from "../../hooks/useTemplateParamsFetch";
// Styles 
import { Wrapper } from "./TemplateParametersTable.styles";

const TemplateParametersTable = ({ templateId }) => {
  const { state: templatesParams, searchTerm, setSearchTerm, setIsLoadingMore } = useTemplateParamsFetch(templateId);

  console.log(templatesParams.results);

  const [parameterId, setParameterId] = useState('');

  const navigate = useNavigate();

  const handleClick = (e, t) => {
    setParameterId(e.currentTarget.dataset.value);

  }

  const handleDelete = async () => {
    try {
      templatesParams.results.map(async (templateParam) => {
        if (document.getElementById(`${templateParam.parameter.id}`).checked) {

          await API.deleteTemplateParam(templateParam.id);

        }
      })

      setParameterId('');

      setTimeout(() => {
        window.location.reload()
      }, 100);
      
    } catch (error) {
      
    }
    
  }

  return (
    <>
      {templatesParams && (
        <>
          <Wrapper>
            <h1>Template Parameters</h1>
            <SearchBar placeholder={"Search Parameter"} setSearchTerm={setSearchTerm} />
            <table className="table table-striped table-hover table-border table-bordered">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Kind</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody id="tbody">
                {templatesParams.results.map(parameter => (
                  <tr onClick={handleClick} data-value={parameter.id}>
                    <td>
                      <input id={parameter.parameter.id} className="checkbox"
                        type='checkbox'
                      />
                    </td>
                    <td>{parameter.parameter.name}</td>
                    <td>{parameter.parameter.kind}</td>
                    <td>{parameter.parameter.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {templatesParams.page < templatesParams.total_pages && (
              <div className="loadMoreButton">
                <ButtonDark text="Load More" callback={() => setIsLoadingMore(true)} />
              </div>
            )}
          </Wrapper>
          {parameterId != '' && (
            <ButtonDark text="Delete Parameter" callback={handleDelete} />
          )}
        </>
      )}
    </>
  )
}

export default TemplateParametersTable;
