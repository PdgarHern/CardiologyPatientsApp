import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
// API
import API from "../API";
// Components
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
// Hook
import { useHospitalsFetch } from "../hooks/useHospitalsFetch";
// Styles
import { Wrapper } from "./Forms.styles";

const RegisterPatient = () => {
  const { state: hospitals } = useHospitalsFetch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [role, setRole] = useState('null');
  const [hospital, setHospital] = useState('null');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [notEmail, setNotEmail] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passConfirmError, setPassConfirmError] = useState(false);
  const [notPassConfirm, setNotPassConfirm] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [hospitalError, setHospitalError] = useState(false);

  const navigate = useNavigate();

  const handleInput = async (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'role') setRole(value);
    if (name === 'hospital') setHospital(value);

  }

  const handleSubmit = async (e) => {
    try {
      if (name != '') {

        if (email != '') {

          if (validator.isEmail(email)) {

            if (hospital != 'null') {

              setLoading(true);

              const formData = new FormData();

              formData.append('email', email);
              formData.append('rol', 'patient');

              await API.inviteUser(formData);

              setLoading(false);

              navigate(`/doctor-profile/${localStorage.userId}`);

            } else {
              setHospitalError(true);
              setTimeout(() => {
                setHospitalError(false)
              }, 3500);
            }

          } else {
            setNotEmail(true);
            setTimeout(() => {
              setNotEmail(false)
            }, 3500);
          }

        } else {
          setEmailError(true);
          setTimeout(() => {
            setEmailError(false)
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
        setEmail('');
        //setPassword('');
        //setPassConfirm('');
        setRole('null');
        window.location.reload();
      }, 2000);

    }

  }

  const handleGoogle = () => {
    navigate('/google-login');
  }

  return (
    <>
      <Wrapper>
        {error && <div className="error">Something went wrong...</div>}
        {!loading && !error && (
          <>
            <label>Name</label>
            <input
              type='text'
              value={name}
              name='name'
              onChange={handleInput}
            />
            {nameError && <div className="formError">*Write your name</div>}
            <label>Email</label>
            <input
              type='text'
              value={email}
              name='email'
              onChange={handleInput}
            />
            {emailError && <div className="formError">*Write your email</div>}
            {notEmail && <div className="formError">*Invalid email</div>}
            <label>Hospital</label>
            <select name='hospital' value={hospital} onChange={handleInput}>
              <option value='null'></option>
              {hospitals.results.map(hospital => (
                <option value={hospital.id}>{hospital.name}</option>
              ))}
            </select>
            <br />
            {hospitalError && <div className="formError">*Select a Hospital</div>}
            <ButtonDark text="Submit" callback={handleSubmit} />
            <br /><br />
            <ButtonDark text="Google Login" callback={handleGoogle} />
          </>
        )}
      </Wrapper>
      {loading && !error &&
        <div className="spinner">
          <Spinner />
        </div>
      }
    </>
  )

}

export default RegisterPatient;
