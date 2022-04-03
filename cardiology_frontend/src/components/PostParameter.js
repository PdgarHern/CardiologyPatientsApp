import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../API";
// Components
import BreadCrumb from "./BreadCrumb";
import ParametersTable from "./ParametersTable";
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
// Styles
import { Wrapper } from "./Users.styles";

const PostParameter = () => {
  const [name, setName] = useState('');
  const [kind, setKind] = useState('');
  const [frequency, setFrequency] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [kindError, setKindError] = useState(false);
  const [frequencyError, setFrequencyError] = useState(false);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'name') setName(value);
    if (name === 'kind') setKind(value);
    if (name === 'frequency') setFrequency(value);

  }

  const handleSubmit = async () => {
    try {
      if (name !== '') {

        if (kind !== '') {

          if (frequency !== '') {

            setLoading(true);

            const formData = new FormData();

            formData.append('parameter[name]', name);
            formData.append('parameter[kind]', kind);
            formData.append('parameter[frequency]', frequency);
            formData.append('parameter[hospital_id]', localStorage.userHosp);

            await API.createParameter(formData);

            setLoading(false);

            navigate("/parameters");

          } else {
            setFrequencyError(true);
            setTimeout(() => {
              setFrequencyError(false)
            }, 3500);
          }

        } else {
          setKindError(true);
          setTimeout(() => {
            setKindError(false)
          }, 3500);
        }

      } else {
        setNameError(true);
        setTimeout(() => {
          setNameError(false)
        }, 3500);
      }

    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
        setLoading(false);
        setName('');
        setKind('');
        setFrequency('');
        window.location.reload();
      }, 2000);

    }

  }

  const handleAuth = () => {
    navigate('/login');
  }

  return (
    <>
      {localStorage.userRol != 'doctor' && (
        handleAuth()
      )}
      <BreadCrumb text="Create Parameter" linkPath={`/parameters`} />
      <Wrapper>
        {error && <div className="error">Something went wrong...</div>}
        {!loading && !error ? (
          <>
            <label>Name</label>
            <input
              type='text'
              value={name}
              name='name'
              onChange={handleInput}
            />
            {nameError && <div className="formError">*Write a name</div>}
            <label>Kind</label>
            <select name='kind' value={kind} onChange={handleInput}>

              <option>Select</option>
              <option>Numeric</option>
              <option>Numeric with two values</option>
              <option>Yes or No</option>

            </select>
            {kindError && <div className="formError">*Select a kind</div>}
            <label>Frequency</label>
            <input
              type='text'
              value={frequency}
              name='frequency'
              onChange={handleInput}
            />
            {frequencyError && <div className="formError">*Write a frequency</div>}
            <ButtonDark text="Submit" callback={handleSubmit} />
            <br />
          </>
        ) : (
          <Spinner />
        )}
      </Wrapper>
    </>
  )
}

export default PostParameter;
