import React from "react";
import { useNavigate } from "react-router-dom";
import jsreport from "@jsreport/browser-client";
// Components
import ButtonDark from "../ButtonDark";
// Hook
import { useAnswersFetch } from "../../hooks/useAnswersFetch";
// Styles 
import { Wrapper } from "./AnswersTable.styles";

const AnswersTable = ({ id }) => {
  const { state: answers } = useAnswersFetch(id);

  const navigate = useNavigate();

  var steps = [];

  const handleClick = (e) => {
    if (localStorage.userRol == 'patient') {
      sessionStorage.setItem('followupId', id);
      navigate(`/put-answer/${e.currentTarget.dataset.value}`);
    }
  }

  const getSteps = () => {
    answers.results.map((answer) => {
      if (answer.parameter.name == 'Steps') {
        steps.push(answer);
      }
    })
  }

  const handleStepsReport = async () => {
    
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'StepsReport'
      },
      data: {
        data: steps
      }

    })

    report.openInWindow({title: 'My Patients Report'});

  } 

  const handleStepsReportPDF = async () => {
    
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'StepsReport(pdf)'
      },
      data: {
        data: steps
      }

    })

    report.openInWindow({title: 'My Patients Report'});

  } 

  return (
    <>
      {answers && (
        <>
          {getSteps()}
          <Wrapper>
            <h1>Answers</h1>
            <table className="table table-striped table-hover table-border table-bordered">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Created at</th>
                </tr>
              </thead>
              <tbody>
                {answers.results.map(answer => (
                  <tr onClick={handleClick} data-value={answer.id}>
                    <td>{answer.parameter.name}</td>
                    <td>{answer.value}</td>
                    <td>{answer.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Wrapper>
          {steps.length > 0 && (
            <>
              <ButtonDark text="Steps Report Online" callback={handleStepsReport} />
              <ButtonDark text="Steps Report PDF" callback={handleStepsReportPDF} />
            </>
          )}
        </>
      )}
    </>
  )
}

export default AnswersTable;
