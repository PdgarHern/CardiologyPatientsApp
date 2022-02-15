import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// API
import API from "../API";
// Components
import BreadCrumb from "./BreadCrumb";
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
// Hook
import { useAnswerFetch } from "../hooks/useAnswerFetch";
// Styles
import { Wrapper, Content } from "./Users.styles";


const PutAnswer = () => {
  const { answerId } = useParams();
  const { state: answer } = useAnswerFetch(answerId);

  const [value, setValue] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleValue = (e) => {
    setValue(e.currentTarget.value);
    e.currentTarget.placeholder = '';

  }

  const handleInput = (e) => {
    setValue(e.currentTarget.value);

  }

  const handleSubmit = async () => {
    try {
      setError(false);
      setLoading(true);

      const formData = new FormData();

      if (value != '') formData.append('answer[value]', value);

      await API.updateAnswer(answerId, formData);

      setLoading(false);

      navigate(`/followup/${sessionStorage.followupId}`);

    } catch (error) {
      setError(true);
    }
  }

  const handleAuth = () => {
    navigate('/login');
  }

  return (
    <>
      {answer.parameter ? (
        <BreadCrumb text={answer.parameter.name} linkPath={`/followup/${sessionStorage.followupId}`} />
      ) : null}
      <Wrapper>
        {error && <div className="error">There was an error....</div>}
        {!loading && answer ? (
          <>
            <Content>
              <div className="column">
                <label>Value</label>
                <input
                  type='text'
                  value={value}
                  placeholder={answer.value}
                  name='value'
                  onClick={handleValue}
                  onChange={handleInput}
                />
              </div>
            </Content>
            <div className="actionButtons">
              <ButtonDark text='Update' callback={handleSubmit} />
            </div>
          </>
        ) : (
          <>
            <Spinner />
            <div>Processing your request...</div>
          </>
        )}
      </Wrapper>
    </>
  )
}

export default PutAnswer;
