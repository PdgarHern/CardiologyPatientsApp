import React, { useEffect, useState } from "react";
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

  const [parameterId, setParameterId] = useState('');
  const [sortedField, setSortedField] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [sortedTableRows, setSortedTableRows] = useState([]);

  const navigate = useNavigate();

  let sortedTemplatesParams = [...templatesParams.results];

  useEffect(() => {
    if (templatesParams !== null) {
      sortedTemplatesParams = [...templatesParams.results];
      setSortedTableRows(sortedTemplatesParams);
    }
  }, [templatesParams]);

  useEffect(() => {
    console.log(sortedTableRows);
    if (sortedField !== '') {
      sortedTemplatesParams.sort((a, b) => {
        if (a.parameter[sortedField] < b.parameter[sortedField]) {
          setSortedTableRows(sortedTemplatesParams);
          return sortDirection === 'asc' ? -1 : 1;

        }
        if (a.parameter[sortedField] > b.parameter[sortedField]) {
          setSortedTableRows(sortedTemplatesParams);
          return sortDirection === 'asc' ? 1 : -1;

        }
        setSortedTableRows(sortedTemplatesParams);
        return 0;

      });

    }
  }, [sortedField, sortDirection]);

  useEffect(() => {
    handleCheck()
  }, [sortedField, sortDirection]);

  const handleCheck = () => {
    templatesParams.results.map(async (parameter) => {
      if (document.getElementById(`${parameter.parameter.id}`).checked) {
        document.getElementById(`${parameter.parameter.id}`).click()
      }
    })
  }

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
                        ? '▼'
                        : '▲'
                      : null}</th>
                  <th onClick={() => {
                    setSortedField('kind');
                    if (sortDirection === '' || sortDirection === 'desc' || sortedField !== 'kind') {
                      setSortDirection('asc');
                    } else {
                      setSortDirection('desc');
                    }
                  }}>Kind {
                    sortDirection !== '' && sortedField === 'kind'
                      ? sortDirection === 'desc' 
                        ? '▼'
                        : '▲'
                      : null}</th>
                  <th onClick={() => {
                    setSortedField('frequency');
                    if (sortDirection === '' || sortDirection === 'desc' || sortedField !== 'frequency') {
                      setSortDirection('asc');
                    } else {
                      setSortDirection('desc');
                    }
                  }}>Frequency {
                    sortDirection !== '' && sortedField === 'frequency'
                      ? sortDirection === 'desc' 
                        ? '▼'
                        : '▲'
                      : null}</th>
                </tr>
              </thead>
              <tbody id="tbody">
                {sortedTableRows.map(parameter => (
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
