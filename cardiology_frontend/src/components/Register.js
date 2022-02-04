import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
// API
import API from "../API";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  const navigate = useNavigate();

  const handleInput = async (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'rol') setRol(value);

  }

  const handleSubmit = async (e) => {
    if (validator.isEmail(email)) {
      const formData = new FormData();

      formData.append('user[email]', email);
      formData.append('user[password]', password);
      formData.append('user[rol]', rol);

      await API.createUser(formData);
      await API.login(formData);

      navigate('/');
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
        value='Sign Up'
      />
      <label>Rol</label>
      <select name='rol' onChange={handleInput}>
        <option value="null"></option>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>
    </>
  )

}

export default Register;
