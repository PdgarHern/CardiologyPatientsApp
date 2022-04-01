import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
import ButtonDark from "../ButtonDark";
import SearchBar from "../SearchBar";
// Hook
import { useTemplatesFetch } from "../../hooks/useTemplatesFetch";
// Styles 
import { Wrapper } from "./TemplatesTable.styles";

const TemplatesTable = ({ select }) => {
  const { state: templates, searchTerm, setSearchTerm, setIsLoadingMore } = useTemplatesFetch();

  const [selected, setSelected] = useState(false);

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (select) {
      setSelected(true);
      sessionStorage.setItem('templateId', e.currentTarget.dataset.value);
      navigate(`/template/${sessionStorage.templateId}`);

    } else {
      navigate(`/put-template/${e.currentTarget.dataset.value}`);

    }
  }

  console.log(templates.results)

  return (
    <>
      {templates && (
        <>
          <Wrapper>
            <h1>Templates</h1>
            <div className="addPatientButton">
              <ButtonDark text="Add template" callback={() => navigate("/post-template")} />
            </div>
            <SearchBar placeholder={"Search Template"} setSearchTerm={setSearchTerm} />
            <table className="table table-striped table-hover table-border table-bordered">
              <thead>
                <th>Name</th>
                <th>Parameters</th>
              </thead>
              <tbody>
                {templates.results.map(template => (
                  <>
                    {template.hospital_id == localStorage.userHosp ? (
                      <tr onClick={handleClick} data-value={template.id}>
                        <td>{template.name}</td>
                        <td>{template.parameters.length} parameters</td>
                      </tr>
                    ) : null}
                  </>
                ))}
              </tbody>
            </table>
            {templates.page < templates.total_pages && (
              <div className="loadMoreButton">
                <ButtonDark text="Load More" callback={() => setIsLoadingMore(true)} />
              </div>
            )}
          </Wrapper>
        </>
      )}
    </>
  )
}

export default TemplatesTable;
