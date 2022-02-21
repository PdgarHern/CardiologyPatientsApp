import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsreport from "@jsreport/browser-client";
// API
import API from "../../API";
// Components
import ButtonDark from "../ButtonDark";
// Hook
import { useParametersFetch } from "../../hooks/useParametersFetch";
// Styles 
import { Wrapper } from "./ParametersTable.styles";

const ParametersTable = ({ report, updatable, templateId }) => {
  const { state: parameters } = useParametersFetch();

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

  const handleReport = async () => {
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'ParametersCount'
      },
      data: {
        data: parameters.results
      }

    })

    report.openInWindow({title: 'My Patients Report'});
  }

  const handleReportPDF = async () => {
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'ParametersCount(pdf)'
      },
      data: {
        data: parameters.results
      }

    })

    report.openInWindow({title: 'My Patients Report'});
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
                  <>
                    {parameter.hospital_id == localStorage.userHosp ? (
                      <tr onClick={handleClick} data-value={parameter.id}>
                        <td>{parameter.name}</td>
                        <td>{parameter.kind}</td>
                        <td>{parameter.frequency}</td>
                      </tr>
                    ) : null}
                  </>
                ))}
              </tbody>
            </table>
          </Wrapper>
          {report && (
            <>
              <ButtonDark text="Number of templates" callback={handleReport} />
              <ButtonDark text="Number of templates (PDF)" callback={handleReportPDF} />
            </>
          )}
          {parameterId != '' && (
            <ButtonDark text="Add Parameter" callback={handleAdd} />
          )}
        </>
      )}
    </>
  )
}

export default ParametersTable;
