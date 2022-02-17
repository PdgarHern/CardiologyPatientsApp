import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
// API
import API from "../API";
// Components
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
// Styles
import { Wrapper } from "./Forms.styles";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const navigate = useNavigate();

  const handleInput = async (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);

  }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (email != '') {

        if (password != '') {

          formData.append('user[email]', email);
          formData.append('user[password]', password);

          await API.login(formData);

          if (localStorage.userRol === 'doctor') {
            navigate(`/doctor-profile/${localStorage.getItem('userId')}`);

          } else if (localStorage.userRol === 'patient') {
            navigate(`/patient-profile/${localStorage.getItem('userId')}`);

          }

        } else {
          setPassError(true);
          setTimeout(() => {
            setPassError(false)
          }, 3500);
        }

      } else {
        setEmailError(true);
        setTimeout(() => {
          setEmailError(false)
        }, 3500);

      }

      setLoading(false);

    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
        setLoading(false);
        setEmail('');
        setPassword('');
        window.location.reload();
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
        const formData = new FormData();

        formData.append('user[email]', google.email);
        formData.append('user[password]', 'google');

        await API.login(formData);

        if (localStorage.userRol === 'doctor') {
          navigate(`/doctor-profile/${localStorage.userId}`);

        } else if (localStorage.userRol === 'patient') {
          navigate(`/patient-profile/${localStorage.userId}`);

        }

      }
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
        setLoading(false);
      }, 2000)
    }
  }

  return (
    <>
      <Wrapper>
        {error && <div className="error">Something went wrong...</div>}
        {!loading && !error && (
          <>
            <label>Email</label>
            <input
              type='text'
              value={email}
              name='email'
              onChange={handleInput}
            />
            {emailError && <div className="formError">*Write your email</div>}
            <label>Password</label>
            <input
              type='password'
              value={password}
              name='password'
              onChange={handleInput}
            />
            {passError && <div className="formError">*Write your password</div>}
            <ButtonDark text='Sign In' callback={handleSubmit} />
            <br /><br />
            <GoogleLogin
              clientId="627745415175-d1977cs12k0vl4iqqv5g496peda58i32.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
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

export default Login;
