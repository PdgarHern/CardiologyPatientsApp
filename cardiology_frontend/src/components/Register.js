import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
// API
import API from "../API";
// Components
import ButtonDark from "./ButtonDark";
// Styles
import { Wrapper } from "./Forms.styles";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [rol, setRol] = useState('null');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [notEmail, setNotEmail] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passConfirmError, setPassConfirmError] = useState(false);
  const [notPassConfirm, setNotPassConfirm] = useState(false);
  const [rolError, setRolError] = useState(false);

  const navigate = useNavigate();

  const handleInput = async (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'passConfirm') setPassConfirm(value);
    if (name === 'rol') setRol(value);

  }

  const handleSubmit = async (e) => {
    if (name != '') {

      if (email != '') {

        if (validator.isEmail(email)) {
  
          if (password != '') {
  
            if (passConfirm != '') {
  
              if (password == passConfirm) {
  
                if (rol != 'null') {
  
                  const formData = new FormData();
    
                  formData.append('user[email]', email);
                  formData.append('user[password]', password);
                  formData.append('user[rol]', rol);
            
                  await API.createUser(formData);
                  await API.login(formData);
                  
                  if (localStorage.userRol === 'doctor') {
                    const formData = new FormData();
            
                    formData.append('doctor[name]', name);
                    formData.append('doctor[user_id]', localStorage.getItem('userId'));
            
                    await API.createDoctor(formData);
            
                    navigate(`/doctor-profile/${localStorage.getItem('userId')}`);
            
                  } else if (localStorage.userRol === 'patient') {
                    const formData = new FormData();
            
                    formData.append('patient[name]', name);
                    formData.append('patient[user_id]', localStorage.getItem('userId'));
            
                    await API.createPatient(formData);
            
                    navigate(`/patient-profile/${localStorage.getItem('userId')}`);
            
                  }
  
                } else {
                  setRolError(true);
                  setTimeout(() => {
                    setRolError(false)
                  }, 3500);
  
                }
  
              } else {
                setNotPassConfirm(true);
                setTimeout(() => {
                  setNotPassConfirm(false)
                }, 3500);
  
              }
  
            } else {
              setPassConfirmError(true);
              setTimeout(() => {
                setPassConfirmError(false)
              }, 3500);
  
            }
  
          } else {
            setPassError(true);
            setTimeout(() => {
              setPassError(false)
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
    
  }

  return (
    <Wrapper>
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
      <label>Password</label>
      <input
        type='password'
        value={password}
        name='password'
        onChange={handleInput}
      />
      {passError && <div className="formError">*Write a password</div>}
      <label>Password Confirmation</label>
      <input
        type='password'
        value={passConfirm}
        name='passConfirm'
        onChange={handleInput}
      />
      {passConfirmError && <div className="formError">*Confirm your password</div>}
      {notPassConfirm && <div className="formError">*Confirmation doesn't match</div>}
      <label>Rol</label>
      <select name='rol' onChange={handleInput}>
        <option value="null"></option>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>
      {rolError && <div className="formError">*Select a role</div>}
      <ButtonDark text="Submit" callback={handleSubmit} />
    </Wrapper>
  )

}

export default Register;
