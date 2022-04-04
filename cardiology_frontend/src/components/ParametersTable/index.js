import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [sortedField, setSortedField] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [sortedTableRows, setSortedTableRows] = useState([]);

  const navigate = useNavigate();

  let sortedParameters = [...parameters.results];

  useEffect(() => {
    if (parameters !== null) {
      sortedParameters = [...parameters.results];
      setSortedTableRows(sortedParameters);
    }
  }, [parameters]);

  useEffect(() => {
    if (sortedField !== '') {
      sortedParameters.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          setSortedTableRows(sortedParameters);
          return sortDirection === 'asc' ? -1 : 1;

        }
        if (a[sortedField] > b[sortedField]) {
          setSortedTableRows(sortedParameters);
          return sortDirection === 'asc' ? 1 : -1;

        }
        setSortedTableRows(sortedParameters);
        return 0;

      });

    }
  }, [sortedField, sortDirection]);

  useEffect(() => {
    handleChecked()
  }, [sortedField, sortDirection]);

  const handleChecked = () => {
    parameters.results.map(async (parameter) => {
      if (document.getElementById(`parameter${parameter.id}`).checked) {
        document.getElementById(`parameter${parameter.id}`).click()
      }
    })
  }

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
        if (document.getElementById(`parameter${parameter.id}`).checked) {
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

  return (
    <>
      {parameters && (
        <>
          <Wrapper>
            <h1>Parameters</h1>
            {!template && (
              <div className="addPatientButton">
                <ButtonDark text="Add parameter" callback={() => navigate("/post-parameter")} />
              </div>
            )}
            <SearchBar placeholder={"Search Parameter"} setSearchTerm={setSearchTerm} />
            <table className="table table-striped table-hover table-border table-bordered">
              <thead>
                <tr>
                  {template && (
                    <th></th>
                  )}
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
              <tbody>
                {sortedTableRows.map(parameter => (
                  <>
                    {parameter.hospital_id == localStorage.userHosp ? (
                      <tr onClick={handleClick} data-value={parameter.id}>
                        {template && (
                          <td>
                            <input id={`parameter${parameter.id}`} className="checkbox"
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
              <div className="loadMoreButton">
                <ButtonDark text="Load More" callback={() => setIsLoadingMore(true)} />
              </div>
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
