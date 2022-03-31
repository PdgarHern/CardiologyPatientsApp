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
import { useParameterFetch } from "../hooks/useParameterFetch";
// Styles
import { Wrapper, ActionButtons, Content } from "./Users.styles";

const PutParameter = () => {
  const { parameterId } = useParams();
  const { state: parameter } = useParameterFetch(parameterId);

  const [name, setName] = useState('');
  const [kind, setKind] = useState('');
  const [frequency, setFrequency] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleValue = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    const placeholder = e.currentTarget.placeholder;

    if (name === 'name' && value === '') {
      setName(placeholder);
      e.currentTarget.placeholder = '';
    };
    if (name === 'kind' && value === '') {
      setKind(placeholder);
      e.currentTarget.placeholder = '';
    };
    if (name === 'frequency' && value === '') {
      setFrequency(placeholder);
      e.currentTarget.placeholder = '';
    };

  }

  const handleInput = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'name') setName(value);
    if (name === 'kind') setKind(value);
    if (name === 'frequency') setFrequency(value);

  }

  const handleSubmit = async () => {
    try {
      setError(false);
      setLoading(true);

      const formData = new FormData();

      if (name != '') formData.append('parameter[name]', name);
      if (kind != '') formData.append('parameter[kind]', kind);
      if (frequency != '') formData.append('parameter[frequency]', frequency);

      await API.updateParameter(parameter.id, formData);

      setLoading(false);

      navigate(`/post-parameter`);

    } catch (error) {
      setError(true);
    }
  }

  const handleDelete = async () => {
    try {
      setError(false);
      setLoading(true);

      await API.deleteParameter(parameter.id);

      setLoading(false);

      navigate('/post-parameter');

    } catch (error) {
      setError(true);
    }
  }

  const handleAuth = () => {
    navigate('/login');
  }

  return (
    <>
      {!localStorage.userId && (
        handleAuth()
      )}
      {localStorage.userRol != 'doctor' && (
        handleAuth()
      )}
      {parameter ? (
        <BreadCrumb text={parameter.name} linkPath={'/post-parameter'} />
      ) : null}
      <>
        {error && <div className="error">There was an error...</div>}
        {!loading && parameter ? (
          <>
            <Wrapper>
              <Content>
                <div className="column">
                  <label>Name</label>
                  <input
                    type='text'
                    value={name}
                    placeholder={parameter.name}
                    name='name'
                    onClick={handleValue}
                    onChange={handleInput}
                  />
                  <label>Kind</label>
                  <input
                    type='text'
                    value={kind}
                    placeholder={parameter.kind}
                    name='kind'
                    onClick={handleValue}
                    onChange={handleInput}
                  />
                  <label>Frequency</label>
                  <input
                    type='text'
                    value={frequency}
                    placeholder={parameter.frequency}
                    name='frequency'
                    onClick={handleValue}
                    onChange={handleInput}
                  />
                </div>
              </Content>
            </Wrapper>
            <ActionButtons>
              <div className="button">
                <ButtonDark text='Update' callback={handleSubmit} />
              </div>
              <div className="button">
                <ButtonDark text='Delete' callback={handleDelete} />
              </div>
            </ActionButtons>
          </>
        ) : (
          <>
            <Spinner />
            <div>Processing your request...</div>
          </>
        )}
      </>
    </>
  )
}

export default PutParameter;
