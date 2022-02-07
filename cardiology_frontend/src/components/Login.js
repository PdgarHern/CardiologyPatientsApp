import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../API";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleInput = async (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);

  }
  
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('user[email]', email);
    formData.append('user[password]', password);

    await API.login(formData);

    if (localStorage.userRol === 'doctor') {
      navigate(`/doctor-profile/${localStorage.getItem('userId')}`);

    } else if (localStorage.userRol === 'patient') {
      navigate(`/patient-profile/${localStorage.getItem('userId')}`);

    }

  }

  return (
    <>
      <label>Email</label>
      <input
        type='text'
        value={email}
        name='email'
        onChange={handleInput}
      />
      <label>Password</label>
      <input
        type='password'
        value={password}
        name='password'
        onChange={handleInput}
      />
      <input
        type='button'
        onClick={handleSubmit}
        value='Sign In'
      />
    </>
  )

}

export default Login;
