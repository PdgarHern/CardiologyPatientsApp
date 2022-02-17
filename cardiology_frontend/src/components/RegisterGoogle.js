import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
// API
import API from "../API";
// Components
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
// Hook
import { useHospitalsFetch } from "../hooks/useHospitalsFetch";
// Styles
import { Wrapper } from "./Users.styles";

const RegisterGoogle = () => {
  const { state: hospitals } = useHospitalsFetch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('null');
  const [hospital, setHospital] = useState('null');

  const [tokenValid, setTokenValid] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [rolError, setRolError] = useState(false);
  const [hospitalError, setHospitalError] = useState(false);

  const navigate = useNavigate();

  const handleInput = async (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'rol') setRol(value);
    if (name === 'hospital') setHospital(value);

  }

  const handleSubmit = async () => {
    try {
      if (email != '') {

        if (rol != 'null') {

          if (hospital != 'null') {

            setLoading(true);

            const formData = new FormData();

            formData.append('user[email]', email);
            formData.append('user[password]', 'google');
            formData.append('user[rol]', rol);

            await API.createUser(formData);
            await API.login(formData);

            if (localStorage.userRol === 'doctor') {
              const formData = new FormData();

              formData.append('doctor[name]', name);
              formData.append('doctor[user_id]', localStorage.userId);
              formData.append('doctor[hospital_id]', hospital);

              localStorage.setItem('userHosp', hospital);

              await API.createDoctor(formData);

              setLoading(false);

              navigate(`/doctor-profile/${localStorage.userId}`);
            
            } else if (localStorage.userRol === 'patient') {
              const formData = new FormData();

              formData.append('patient[name]', name);
              formData.append('patient[user_id]', localStorage.userId);
              formData.append('patient[hospital_id]', hospital);

              localStorage.setItem('userHosp', hospital);

              await API.createPatient(formData);

              setLoading(false);

              navigate(`/patient-profile/${localStorage.userId}`);

            }

          } else {
            setHospitalError(true);
            setTimeout(() => {
              setHospitalError(false)
            }, 3500);
          }

        } else {
          setRolError(true);
          setTimeout(() => {
            setRolError(false)
          }, 3500);
        }

      } else {
        setEmailError(true);
        setTimeout(() => {
          setEmailError(false)
        }, 3500);
      }

    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
        setLoading(false);
        setEmail('');
        setRol('null');
        setHospital('null');
      }, 2000);
    }

  }

  const responseGoogle = async (response) => {
    try {
      setLoading(true);
      setError(false);

      const google = await API.chechToken(response.accessToken);

      if (!google.email) {
        throw "error";

      } else {
        setTokenValid(true);
        setEmail(google.email);
        setName(response.profileObj.givenName);

      }

      setLoading(false);

    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
        setLoading(false);
      }, 2000);
    }

  }

  return (
    <Wrapper>
      {error && <div className="error">Something went wrong...</div>}
      {!loading && !error ? (
        <>
          <h1>Google Registration</h1>
          <GoogleLogin
            clientId="627745415175-d1977cs12k0vl4iqqv5g496peda58i32.apps.googleusercontent.com"
            buttonText="Email"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          {tokenValid && <p>{email}</p>}
          {emailError && <div className="formError">*Please log in</div>}
          <br/>
          <label>Rol</label>
          <select name='rol' onChange={handleInput}>
            <option value="null"></option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
          <br />
          {rolError && <div className="formError">*Select a role</div>}
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
        </>
      ) : (
        <Spinner />
      )}

    </Wrapper>
  )

}

export default RegisterGoogle;


