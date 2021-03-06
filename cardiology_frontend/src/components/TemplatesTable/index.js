import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
import ButtonDark from "../ButtonDark";
import SearchBar from "../SearchBar";
// Hook
import { useTemplatesFetch } from "../../hooks/useTemplatesFetch";
// Styles 
import { Wrapper } from "./TemplatesTable.styles";

const TemplatesTable = ({ select }) => {
  const { state: templates, searchTerm, setSearchTerm, setIsLoadingMore, setIsLoadingPrevious } = useTemplatesFetch();

  const [selected, setSelected] = useState(false);
  const [sortedField, setSortedField] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [sortedTableRows, setSortedTableRows] = useState([]);

  const navigate = useNavigate();

  let sortedTemplates = [...templates.results];

  useEffect(() => {
    if (templates !== null) {
      sortedTemplates = [...templates.results];
      setSortedTableRows(sortedTemplates);
    }
  }, [templates]);

  useEffect(() => {
    if (sortedField !== '') {
      sortedTemplates.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          setSortedTableRows(sortedTemplates);
          return sortDirection === 'asc' ? -1 : 1;

        }
        if (a[sortedField] > b[sortedField]) {
          setSortedTableRows(sortedTemplates);
          return sortDirection === 'asc' ? 1 : -1;

        }
        setSortedTableRows(sortedTemplates);
        return 0;

      });

    }
  }, [sortedField, sortDirection]);

  const handleClick = (e) => {
    if (select) {
      setSelected(true);
      sessionStorage.setItem('templateId', e.currentTarget.dataset.value);
      navigate(`/template/${sessionStorage.templateId}`);

    } else {
      navigate(`/put-template/${e.currentTarget.dataset.value}`);

    }
  }

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
                <th onClick={() => {
                  setSortedField('name');
                  if (sortDirection === '' || sortDirection === 'desc' || sortedField !== 'name') {
                    setSortDirection('asc');
                  } else {
                    setSortDirection('desc');
                  }
                }}>Name {
                    sortDirection !== '' && sortedField === 'name'
                      ? sortDirection === 'desc'
                        ? '???'
                        : '???'
                      : null}</th>
                <th>Parameters</th>
              </thead>
              <tbody>
                {sortedTableRows.map(template => (
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
            <div className="loadMoreButton">
              {templates.page === 1 ? (
                <button type="button" className="btn btn-light" disabled onClick={() => setIsLoadingPrevious(true)}>Previous</button>
              ) : (
                <button type="button" className="btn btn-light" onClick={() => setIsLoadingPrevious(true)}>Previous</button>
              )}
              {templates.page === templates.total_pages ? (
                <button type="button" className="btn btn-light" disabled onClick={() => setIsLoadingMore(true)}>Next</button>
              ) : (
                <button type="button" className="btn btn-light" onClick={() => setIsLoadingMore(true)}>Next</button>
              )}
            </div>
          </Wrapper>
        </>
      )}
    </>
  )
}

export default TemplatesTable;
