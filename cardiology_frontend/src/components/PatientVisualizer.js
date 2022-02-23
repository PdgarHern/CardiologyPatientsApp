import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// API
import API from "../API";
// Components
import ButtonDark from "./ButtonDark";
import BreadCrumb from "./BreadCrumb";
import HeroImage from "./HeroImage";
import FollowUpsTable from "./FollowUpsTable";

import ActionCableManager from "../ActionCableManager";
// Hook
import { usePatientFetch } from "../hooks/usePatientFetch";
import { useChatFetch } from "../hooks/useChatFetch";
// Styles
import { Wrapper } from "./Users.styles";
// Images
import UserPic from "../images/userpic.png";

const actioncable = new ActionCableManager();

const PatientVisualizer = () => {
  const { patientId } = useParams();
  const { state: chat } = useChatFetch(sessionStorage.doctorId, patientId);
  const { state: patient } = usePatientFetch(patientId, 'visualize');

  const [name, setName] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState(false);
  
  const navigate = useNavigate();

  const handleInput = (e) => {
    setName(e.currentTarget.value);
  }

  const handleChat = () => {
    actioncable.connectToChannel();
    navigate(`/chat/${chat[0].id}`)
  }

  const handleStartChat = async () => {
    try {

      if (name != '') {
        setLoading(true);

        const formData = new FormData();
  
        formData.append('chat[name]', name);
        formData.append('chat[doctor_id]', sessionStorage.doctorId);
        formData.append('chat[patient_id]', patientId);

        await API.createChat(formData);
  
        setLoading(false);
  
        navigate(`/chat/${chat[0].id}`);

      } else {
        setNameError(true);
        setTimeout(() => {
          setNameError(false)
        }, 2000);
        
      }
      
    } catch (error) {
      setError(true);
      console.log(error);
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
      {localStorage.userRol != 'doctor' && (
        handleAuth()
      )}
      {patient && (
        <>
          <BreadCrumb text={patient.name} linkPath={`/doctor-profile/${localStorage.userId}`} />
          <HeroImage 
            userPic={patient.img == null
              ? UserPic
              : patient.img.url}
            name={patient.name}
          />
          <FollowUpsTable id={patientId} />
          {chat[0] ? (
            <ButtonDark text="Chat" callback={handleChat} />
          ) : (
            <Wrapper>
              <label>Chat name</label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={handleInput}
              />
              {nameError && <div className="formError">*Insert a name</div>}
              <ButtonDark text="Start chat" callback={handleStartChat} />
              {error && <div className="error">Something went wrong...</div>}
            </Wrapper>
          )}
        </>
      )}
    </>
  )
}

export default PatientVisualizer;
