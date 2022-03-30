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

  const navigate = useNavigate();

  const handleClick = (e, t) => {
    setParameterId(e.currentTarget.dataset.value);

    // console.log(document.getElementById(`${e.currentTarget.dataset.value}`).checked);

  }

  const handleDelete = async () => {
    try {
      // console.log(parameterId);
      templatesParams.results.map(async (templateParam) => {
        if (document.getElementById(`${templateParam.parameter_id}`).checked) {

          await API.deleteTemplateParam(templateParam.id);
          // console.log(templateParam.parameter_id);

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
      {template.parameters && (
        <>
          <Wrapper>
            <h1>Template Parameters</h1>
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
                {template.parameters.map(parameter => (
                  <tr onClick={handleClick} data-value={parameter.id}>
                    <td>
                      <input id={parameter.id} className="checkbox"
                        type='checkbox'
                      />
                    </td>
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
