import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// API
import API from "../API";
// Components
import BreadCrumb from "./BreadCrumb";
import AnswersTable from "./AnswersTable";
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
// Hook
import { useFollowUpFetch } from "../hooks/useFollowUpFetch";
// Styles
import { Wrapper, Content } from "./Followups.styles";

const FollowUpVisualizer = () => {
  const { followupId } = useParams();
  const { state: followUp, loading, setLoading, error, setError } = useFollowUpFetch(followupId);

  const [parameterId, setParameterId] = useState(null);
  const [parameterName, setParameterName] = useState('');
  const [answer, setAnswer] = useState('');

  const [answerError, setAnswerError] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const navigate = useNavigate();

  const handleClick = (e) => {
    setParameterId(e.currentTarget.textContent[0]);
    followUp.followuptemplate.parameters.map((parameter) => {
      if (parameter.id == e.currentTarget.textContent[0]) {
        setParameterName(parameter.name);
      }
    })
  }

  const handleInput = (e) => {
    setAnswer(e.currentTarget.value);

  }

  const handleSubmit = async () => {
    try {
      if (answer != '') {
        setLoading(true);

        const formData = new FormData();

        formData.append('answer[value]', answer);
        formData.append('answer[parameter_id]', parameterId);
        formData.append('answer[followup_id]', followupId);
        formData.append('answer[hospital_id]', localStorage.userHosp);

        await API.createAnswer(formData);

        setLoading(false);

        setConfirmation(true);
        setTimeout(() => {
          setConfirmation(false)
        }, 3500);

        setParameterId(null);
        setAnswer('');

      } else {
        setAnswerError(true);
        setTimeout(() => {
          setAnswerError(false)
        }, 3500);
      }

    } catch (error) {
      setError(true);
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true);

      await API.deleteFollowUp(followupId);

      setLoading(false);

      navigate(`/patient/${sessionStorage.patientId}`);

    } catch (error) {
      setError(true);
    }
  }

  return (
    <>
      {localStorage.userRol == 'doctor' ? (
        <BreadCrumb text="Follow-Up" linkPath={`/patient/${sessionStorage.patientId}`} />
      ) : (
        <BreadCrumb text="Follow-Up" linkPath={`/my-followups/${sessionStorage.patientId}`} />
      )}
      {localStorage.removeItem('followupId')}
      <Wrapper>
        {error && <div className="formError">Something went wrong...</div>}
        {!loading && !error ? (
          <>
            <h1>Follow-Up</h1>
            <Content>
              {followUp && (
                <>
                  <div className="column">
                    <h2>Start Date: <p>{followUp.startDate}</p> </h2>
                  </div>
                  <div className="column">
                    <h2>End Date: <p>{followUp.endDate}</p> </h2>
                  </div>
                  <div className="column">
                    <h2>Doctor: <p>{followUp.doctor.name}</p> </h2>
                  </div>
                </>
              )}
            </Content>

            <br />
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
                {followUp.followuptemplate.parameters.map(parameter => (
                  <tr onClick={handleClick}>
                    <td id="id">{parameter.id}</td>
                    <td>{parameter.name}</td>
                    <td>{parameter.kind}</td>
                    <td>{parameter.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br/>
            {localStorage.userRol == 'doctor' ? (
              <ButtonDark text='Delete' callback={handleDelete} />
            ) : (
              <>
                {parameterId != null ? (
                  <>
                    <label>{parameterName}</label>
                    <input
                      type='text'
                      value={answer}
                      name='answer'
                      onChange={handleInput}
                    />
                    {answerError && <div className='formError'>*Write your answer</div>}
                    {confirmation && <div>Answer sent correctly</div>}
                    <ButtonDark text="Answer" callback={handleSubmit} />
                  </>
                ) : null}
              </>
            )}
            <AnswersTable id={followupId} />
          </>
        ) : (
          <Spinner />
        )}

      </Wrapper>
    </>
  )
}

export default FollowUpVisualizer;
