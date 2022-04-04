import React, { useState, useEffect } from "react";
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
import { Wrapper, Content } from "./Users.styles";

const PutParameter = () => {
  const { parameterId } = useParams();
  const { state: parameter } = useParameterFetch(parameterId);

  const [name, setName] = useState('');
  const [kind, setKind] = useState('');
  const [frequency, setFrequency] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (parameter !== null) {
      setName(parameter.name);
      setKind(parameter.kind);
      setFrequency(parameter.frequency);
    }
  }, [parameter])

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

      if (name !== '') formData.append('parameter[name]', name);
      if (kind !== '') formData.append('parameter[kind]', kind);
      if (frequency !== '') formData.append('parameter[frequency]', frequency);

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
      {localStorage.userRol !== 'doctor' && (
        handleAuth()
      )}
      {parameter ? (
        <BreadCrumb text={parameter.name} linkPath={'/parameters'} />
      ) : null}
      <Wrapper>
        {error && <div className="error">There was an error...</div>}
        {!loading && parameter ? (
          <>
            <Content>
              <div className="column">
                <label>Name</label>
                <input
                  type='text'
                  value={name}
                  name='name'
                  onChange={handleInput}
                />
                <label>Kind</label>
                <select name='kind' onChange={handleInput}>
                  <option>{parameter.kind}</option>
                  <option>Numeric</option>
                  <option>Numeric with two values</option>
                  <option>Yes or No</option> 
                </select>
                <label>Frequency</label>
                <input
                  key={parameter.frequency}
                  type='text'
                  value={frequency}
                  name='frequency'
                  onChange={handleInput}
                />
              </div>

            </Content>
            <div className="actionButtons">
              <ButtonDark text='Update' callback={handleSubmit} />
              <ButtonDark text='Delete' callback={handleDelete} />
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

export default PutParameter;
