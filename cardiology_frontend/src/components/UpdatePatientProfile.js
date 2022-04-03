import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// API
import API from "../API";
// Components
import BreadCrumb from "./BreadCrumb";
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
// Hook
import { usePatientFetch } from "../hooks/usePatientFetch";
import { useHospitalsFetch } from "../hooks/useHospitalsFetch";
// Styles
import { Wrapper, Content } from "./Users.styles";
// Image
import UserPic from "../images/userpic.png";

const UpdatePatientProfile = () => {
  const userId = useParams();
  const { state: info } = usePatientFetch(userId.patientId);
  const { state: hospitals } = useHospitalsFetch();

  const [name, setName] = useState('');
  const [clinicRecord, setClinicRecord] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [consentRGPD, setConsentRGPD] = useState('');
  const [hospital, setHospital] = useState(localStorage.userHosp);
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
    if (name === 'hospital') setHospital(value);
    if (name === 'img') setImg(e.currentTarget.files[0]);

  }

  const handleSubmit = async () => {
    try {
      setError(false);
      setLoading(true);

      console.log("hola");

      const formData = new FormData();

      if (name != '') formData.append('patient[name]', name);
      if (clinicRecord != '') formData.append('patient[clinicRecord]', clinicRecord);
      if (gender != '') formData.append('patient[gender]', gender);
      if (birthDate != '') formData.append('patient[birthDate]', birthDate);
      if (phoneNumber != '') formData.append('patient[phoneNumber]', phoneNumber);
      if (consentRGPD != '') formData.append('patient[consentRGPD]', consentRGPD);
      if (hospital != localStorage.userHosp) {
        formData.append('patient[hospital_id]', hospital);
        localStorage.userHosp = hospital;
      }
      if (img != null) formData.append('patient[img]', img);

      await API.updatePatient(info.id, formData);

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
      {localStorage.userRol != 'patient' && (
        handleAuth()
      )}
      {info[0] ? (
        <BreadCrumb text={info[0].name} linkPath={`/patient-profile/${localStorage.userId}`} />
      ) : null}
      <Wrapper>
        {error && <div className="error">There was an error...</div>}
        {!loading && info ? (
          <Content>
            <div className="column">
              <label>Name</label>
              <input
                type='text'
                value={name}
                placeholder={info.name}
                name='name'
                onClick={handleValue}
                onChange={handleInput}
              />
              <label>Clinic Record</label>
              <input
                type='text'
                value={clinicRecord}
                placeholder={info.clinicRecord}
                name='clinicRecord'
                onClick={handleValue}
                onChange={handleInput}
              />
              <label>Gender</label>
              <input
                type='text'
                value={gender}
                placeholder={info.gender}
                name='gender'
                onClick={handleValue}
                onChange={handleInput}
              />
              <label>Birth Date</label>
              <input
                type='date'
                value={birthDate}
                placeholder={info.birthDate}
                name='birthDate'
                onClick={handleValue}
                onChange={handleInput}
              />
              <label>Phone Number</label>
              <input
                type='text'
                value={phoneNumber}
                placeholder={info.phoneNumber}
                name='phoneNumber'
                onClick={handleValue}
                onChange={handleInput}
              />
              <label>Consent RGPD</label>
              <input
                type='text'
                value={consentRGPD}
                placeholder={info.consentRGPD}
                name='consentRGPD'
                onClick={handleValue}
                onChange={handleInput}
              />
              <label>Hospital</label>
              <select name='hospital' value={hospital} onChange={handleInput}>
                {hospitals.results.map(hospital => (
                  <option value={hospital.id}>{hospital.name}</option>
                ))}
              </select>
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
