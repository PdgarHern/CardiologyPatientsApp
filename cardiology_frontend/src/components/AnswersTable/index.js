import React from "react";
import { useNavigate } from "react-router-dom";
// Hook
import { useAnswersFetch } from "../../hooks/useAnswersFetch";
// Styles 
import { Wrapper } from "./AnswersTable.styles";

const AnswersTable = ({ id }) => {
  const { state: answers } = useAnswersFetch(id);

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (localStorage.userRol == 'patient') {
      sessionStorage.setItem('followupId', id);
      navigate(`/put-answer/${e.currentTarget.dataset.value}`);
    }
  }

  return (
    <>
      {answers && (
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
      )}
    </>
  )
}

export default AnswersTable;
