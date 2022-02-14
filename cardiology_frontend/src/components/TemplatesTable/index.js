import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Hook
import { useTemplatesFetch } from "../../hooks/useTemplatesFetch";
// Styles 
import { Wrapper } from "./TemplatesTable.styles";

const TemplatesTable = ({ select }) => {
  const { state: templates } = useTemplatesFetch();

  const [selected, setSelected] = useState(false);

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (select) {
      setSelected(true);
      sessionStorage.setItem('templateId', e.currentTarget.textContent[0]);
    
    } else {
      navigate(`/put-template/${e.currentTarget.textContent[0]}`);

    }
  }

  return (
    <>
      {templates && (
        <>
          <Wrapper>
            <h1>Templates</h1>
            <table className="table table-striped table-hover table-border table-bordered">
              <thead>
                <th>Name</th>
              </thead>
              <tbody>
                {templates.results.map(template => (
                  <tr onClick={handleClick}>
                    <td id="id">{template.id}</td>
                    <td>{template.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Wrapper>
        </>
      )}
    </>
  )
}

export default TemplatesTable;
