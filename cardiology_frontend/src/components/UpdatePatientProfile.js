import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// API
import API from "../API";
// Components
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
// Hook
import { usePatientFetch } from "../hooks/usePatientFetch";
// Styles
import { Wrapper, Content } from "./Users.styles";
// Image
import UserPic from "../images/userpic.png";

const UpdatePatientProfile = () => {
  const { state: info } = usePatientFetch(localStorage.userId);

  const [name, setName] = useState('');
  const [clinicRecord, setClinicRecord] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [consentRGPD, setConsentRGPD] = useState('');
  const [img, setImg] = useState(null);

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
    }
    if (name === 'clinicRecord' && value === '') {
      setClinicRecord(placeholder);
      e.currentTarget.placeholder = '';
    }
    if (name === 'gender' && value === '') {
      setGender(placeholder);
      e.currentTarget.placeholder = '';
    }
    if (name === 'birthDate' && value === '') {
      setBirthDate(placeholder);
      e.currentTarget.placeholder = '';
    }
    if (name === 'phoneNumber' && value === '') {
      setPhoneNumber(placeholder);
      e.currentTarget.placeholder = '';
    }
    if (name === 'consentRGPD' && value === '') {
      setConsentRGPD(placeholder);
      e.currentTarget.placeholder = '';
    }

  }

  const handleInput = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'name') setName(value);
    if (name === 'clinicRecord') setClinicRecord(value);
    if (name === 'gender') setGender(value);
    if (name === 'birthDate') setBirthDate(value);
    if (name === 'phoneNumber') setPhoneNumber(value);
    if (name === 'consentRGPD') setConsentRGPD(value);
    if (name === 'img') setImg(e.currentTarget.files[0]);

  }

  const handleSubmit = async () => {
    try {
      setError(false);
      setLoading(true);

      if (img == null) {
        const formData = new FormData();

        if (name != '') formData.append('patient[name]', name);
        if (clinicRecord != '') formData.append('patient[clinicRecord]', clinicRecord);
        if (gender != '') formData.append('patient[gender]', gender);
        if (birthDate != '') formData.append('patient[birthDate]', birthDate);
        if (phoneNumber != '') formData.append('patient[phoneNumber]', phoneNumber);
        if (consentRGPD != '') formData.append('patient[consentRGPD]', consentRGPD);

        await API.updatePatient(info[0].id, formData);

      } else {
        const formData = new FormData();

        if (name != '') formData.append('patient[name]', name);
        if (clinicRecord != '') formData.append('patient[clinicRecord]', clinicRecord);
        if (gender != '') formData.append('patient[gender]', gender);
        if (birthDate != '') formData.append('patient[birthDate]', birthDate);
        if (phoneNumber != '') formData.append('patient[phoneNumber]', phoneNumber);
        if (consentRGPD != '') formData.append('patient[consentRGPD]', consentRGPD);
        formData.append('patient[img]', img);

        await API.updatePatient(info[0].id, formData);

      }

      setLoading(false);

      navigate(`/patient-profile/${localStorage.userId}`);

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

      <Wrapper>
        {error && <div className="error">There was an error...</div>}
        {!loading && info[0] ? (
          <Content>
            <div className="column">
              <label>Name</label>
              <input
                type='text'
                value={name}
                placeholder={info[0].name}
                name='name'
                onClick={handleValue}
                onChange={handleInput}
              />
              <label>Clinic Record</label>
              <input
                type='text'
                value={clinicRecord}
                placeholder={info[0].clinicRecord}
                name='clinicRecord'
                onClick={handleValue}
                onChange={handleInput}
              />
              <label>Gender</label>
              <input
                type='text'
                value={gender}
                placeholder={info[0].gender}
                name='gender'
                onClick={handleValue}
                onChange={handleInput}
              />
              <label>Birth Date</label>
              <input
                type='text'
                value={birthDate}
                placeholder={info[0].birthDate}
                name='birthDate'
                onClick={handleValue}
                onChange={handleInput}
              />
              <label>Phone Number</label>
              <input
                type='text'
                value={phoneNumber}
                placeholder={info[0].phoneNumber}
                name='phoneNumber'
                onClick={handleValue}
                onChange={handleInput}
              />
              <label>Consent RGPD</label>
              <input
                type='text'
                value={consentRGPD}
                placeholder={info[0].consentRGPD}
                name='consentRGPD'
                onClick={handleValue}
                onChange={handleInput}
              />
            </div>
            <div className="column">
              <label>Profile Image</label>
              <input
                id='image'
                type='file'
                name='img'
                onChange={handleInput}
              />
            </div>
          </Content>
        ) : (
          <>
            <Spinner />
            <div>Processing your request...</div>
          </>
        )}
        {!loading && (
          <ButtonDark text='Update' callback={handleSubmit} />
        )}
      </Wrapper>
    </>
  )

}

export default UpdatePatientProfile;
