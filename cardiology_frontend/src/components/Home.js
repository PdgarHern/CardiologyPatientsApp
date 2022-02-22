import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsreport from "@jsreport/browser-client";
// Components
import ButtonDark from "./ButtonDark";
// Hook
import { useHospitalsFetch } from "../hooks/useHospitalsFetch";
// Styles
import { Wrapper } from "./Users.styles";

const Home = () => {
  const { state: hospitals } = useHospitalsFetch();

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogin = () => {
    navigate('/login');
  }

  const handleNumberPatients = async () => {
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'PatientsHospital'
      },
      data: {
        data: hospitals.results
      }

    })

    report.openInWindow({title: 'My Patients Report'});
  }

  const handleNumberPatientsPDF = async () => {
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'PatientsHospital(pdf)'
      },
      data: {
        data: hospitals.results
      }

    })

    report.openInWindow({title: 'My Patients Report'});
  }

  const handleSubmit = () => {
    const templateId = 'template_ktjxics'

    sendFeedback(templateId);
  }

  const sendFeedback = async (templateId) => {
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'PatientsHospital'
      },
      data: {
        data: hospitals.results
      }

    })

    console.log(report.content)

    window.emailjs.send(
      'service_eilqyzm', templateId,
      {message: 'The report has not been sent... but hey... at least you received the email...', from_name: 'Pepe', reply_to: 'Pepe@tuhmuertoh'}
    ).then(res => {
      console.log(res)
    }).catch(err => console.error(err));
  }

  return (
    <Wrapper>
      <ButtonDark text="Login" callback={handleLogin} />
      <ButtonDark text="Register" callback={handleRegister} />
      {localStorage.userId && (
        <>
          <ButtonDark text="Number of patients" callback={handleNumberPatients} />
          <ButtonDark text="Number of patients (PDF)" callback={handleNumberPatientsPDF} />
          <ButtonDark text="Email" callback={handleSubmit} />
        </>
      )}
      <h1><a href="http://localhost:5500/Welcome.html">App Help</a></h1>
    </Wrapper>
    
  )
}

export default Home;
