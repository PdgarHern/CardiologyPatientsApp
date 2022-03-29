import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { API_URL } from "../config";
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
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('null');
  const [hospital, setHospital] = useState('null');

  const [tokenValid, setTokenValid] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [hospitalError, setHospitalError] = useState(false);

  const navigate = useNavigate();

  const handleInput = async (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'role') setRole(value);
    if (name === 'hospital') setHospital(value);

  }

  const handleSubmit = async () => {
    try {
      if (email != '') {

        if (role != 'null') {

          if (hospital != 'null') {

            setLoading(true);

            const formData = new FormData();
            const loginForm = new FormData();

            formData.append('user[email]', email);
            formData.append('user[password]', password);
            formData.append('user[rol]', role);

            loginForm.append('user[email]', email);
            loginForm.append('user[password]', password);

            await API.createUser(formData);
            await API.login(loginForm);

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
          setRoleError(true);
          setTimeout(() => {
            setRoleError(false)
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
        setRole('null');
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
        setPassword(response.profileObj.googleId);

      }

      setLoading(false);

    } catch (error) {
      setError(true);
      console.log(error);
      setTimeout(() => {
        setError(false);
        setLoading(false);
      }, 2000);
    }

  }

  const handleGoogleRegister = () => {
    axios.post(`${API_URL}/users/auth/google_oauth2`);
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
            onSuccess={() => {responseGoogle()}}
            onFailure={() => {responseGoogle()}}
            cookiePolicy={'single_host_origin'}
          />
          <ButtonDark text="Google Register" callback={handleGoogleRegister} />
          {tokenValid && <p>{email}</p>}
          {emailError && <div className="formError">*Please log in</div>}
          <br/>
          <label>Role</label>
          <select name='role' onChange={handleInput}>
            <option value="null"></option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
          <br />
          {roleError && <div className="formError">*Select a role</div>}
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


