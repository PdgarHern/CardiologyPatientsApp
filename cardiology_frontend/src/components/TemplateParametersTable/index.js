import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../../API";
// Components
import ButtonDark from "../ButtonDark";
// Hook
import { useTemplateFetch } from "../../hooks/useTemplateFetch";
import { useTemplateParamsFetch } from "../../hooks/useTemplateParamsFetch";
// Styles 
import { Wrapper } from "./TemplateParametersTable.styles";

const TemplateParametersTable = ({ templateId }) => {
  const { state: template } = useTemplateFetch(templateId);
  const { state: templatesParams } = useTemplateParamsFetch(templateId);

  const [parameterId, setParameterId] = useState('');
  const [templateParamId, setTemplateParamId] = useState('');

  const navigate = useNavigate();

  const handleClick = (e) => {
    setParameterId(e.currentTarget.dataset.value);

  }

  const handleDelete = async () => {
    try {
      templatesParams.results.map(async (templateParam) => {
        if (templateParam.parameter_id == parameterId) {

          await API.deleteTemplateParam(templateParam.id);

        }
      })

      setParameterId('');

      window.location.reload();
      
    } catch (error) {
      
    }
    
  }

  return (
    <>
      {template.parameters && (
        <>
          <Wrapper>
            <h1>Template Parameters</h1>
            <table className="table table-striped table-hover table-border table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Kind</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {template.parameters.map(parameter => (
                  <tr onClick={handleClick} data-value={parameter.id}>
                    <td>{parameter.name}</td>
                    <td>{parameter.kind}</td>
                    <td>{parameter.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
