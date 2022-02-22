import React, { useState } from "react";
import ActionCableManager from "../ActionCableManager";
// API
import API from "../API";
// Components
import BreadCrumb from "./BreadCrumb";
import ButtonDark from "./ButtonDark";
// Hook
import { useChatFetch } from "../hooks/useChatFetch";
// Styles
import { Wrapper } from "./Users.styles";

const Chat = () => {
  const { state: chat } = useChatFetch(sessionStorage.doctorId, sessionStorage.patientId);

  const actioncable = new ActionCableManager();

  actioncable.connectToChannel();

  const [message, setMessage] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setMessage(e.currentTarget.value);
  }

  const handleSubmit = async () => {
    try {
      if (message != '') {
        setLoading(true);

        const formData = new FormData();

        formData.append('message[value]', message);
        formData.append('message[chat_id]', chat[0].id);

        if (localStorage.userRol == 'doctor') {
          formData.append('message[doctor_id]', sessionStorage.doctorId);

        }
        if (localStorage.userRol == 'patient') {
          formData.append('message[patient_id]', sessionStorage.patientId);

        }

        await API.createMessage(formData);

        setLoading(false);

        actioncable.sendSomething(`http://localhost:3000/chats?doctorId=${sessionStorage.doctorId}&patientId=${sessionStorage.patientId}`);
      }

    } catch (error) {
      setError(true);
    }
  }

  return (
    <>
      {chat[0] ? (
        <>
          {localStorage.userRol == 'doctor' ? (
            <BreadCrumb text={chat[0].name} linkPath={`/patient/${sessionStorage.patientId}`} />
          ) : (
            <BreadCrumb text={chat[0].name} linkPath={`/chats-visualizer/${sessionStorage.patientId}`} />
          )}
          <Wrapper>
            <div className="chatMessages">
              {chat[0].messages.map(message => (
                <>
                  {(localStorage.userRol == 'doctor' && message.doctor_id != null) || (localStorage.userRol == 'patient' && message.patient_id != null) ? (
                    <div id="thisUser">{message.value}</div>
                  ) : (
                    <div id="otherUser">{message.value}</div>
                  )}
                </>
              ))}
            </div>
            <div className="sendMessage">
              <input
                type='text'
                name='message'
                value={message}
                onChange={handleInput}
              />
              <ButtonDark text="Send" callback={handleSubmit} />
            </div>
            {error && <div className="error">Something went wrong...</div>}
          </Wrapper>
        </>
      ) : null}
    </>
  )
}

export default Chat;
