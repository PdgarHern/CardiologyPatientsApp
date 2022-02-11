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
import { useDoctorFetch } from "../hooks/useDoctorFetch";
import { useHospitalsFetch } from "../hooks/useHospitalsFetch";
// Styles
import { Wrapper, Content } from "./Users.styles";
// Image
import UserPic from "../images/userpic.png";

const UpdateDoctorProfile = () => {
  // const { userId } = useParams();
  const { state: info } = useDoctorFetch(localStorage.userId);
  const { state: hospitals } = useHospitalsFetch();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
    };
    if (name === 'phoneNumber' && value === '') setPhoneNumber(placeholder);

  }

  const handleInput = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'name') setName(value);
    if (name === 'phoneNumber') setPhoneNumber(value);
    if (name === 'hospital') setHospital(value);
    if (name === 'img') setImg(e.currentTarget.files[0]);

  }

  const handleSubmit = async () => {
    try {
      setError(false);
      setLoading(true);

      const formData = new FormData();

      if (name != '') formData.append('doctor[name]', name);
      if (phoneNumber != '') formData.append('doctor[phoneNumber]', phoneNumber);
      if (hospital != localStorage.userHosp) {
        formData.append('doctor[hospital_id]', hospital);
        localStorage.userHosp = hospital;
      }
      if (img != null) formData.append('doctor[img]', img);

      await API.updateDoctor(info[0].id, formData);

      setLoading(false);

      navigate(`/doctor-profile/${localStorage.userId}`);

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
      {info[0] ? (
        <BreadCrumb text={info[0].name} linkPath={`/doctor-profile/${localStorage.userId}`} />
      ) : null}
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
              <label>Phone Number</label>
              <input
                type='text'
                value={phoneNumber}
                placeholder={info[0].phoneNumber}
                name='phoneNumber'
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

export default UpdateDoctorProfile;
