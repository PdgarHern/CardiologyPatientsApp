import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsreport from "@jsreport/browser-client";
// Components
import ButtonDark from "./ButtonDark";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// Hook
import { useHospitalsFetch } from "../hooks/useHospitalsFetch";
// Styles
import { Wrapper } from "./Users.styles";
// Images
import Gif from "../images/logo.gif";

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '50px',
  boxShadow: 24,
  p: 4,
  h1: {color: '#1c1c1c', marginLeft: '30%'},
  '.modalButtons': {
    display: 'flex',
    flexDirection: 'row',
  }
};

const Home = () => {
  const { state: hospitals } = useHospitalsFetch();

  const [open, setOpen] = useState(false);

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
      {message: report, from_name: 'Pepe', reply_to: 'Pepe@tuhmuertoh'}
    ).then(res => {
      console.log(res)
    }).catch(err => console.error(err));
  }

  const handleOpenModal = () => {
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false);
  }

  return (
    <Wrapper>
      <img src={Gif} alt="GIF" />
      <ButtonDark text="Login" callback={handleLogin} />
      <ButtonDark text="Register" callback={handleRegister} />
      {localStorage.userId && (
        <>
          <ButtonDark text="Number of patients" callback={handleOpenModal} />
          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h1>Choose an option</h1>
              <div className="modalButtons">
                <ButtonDark text="Online" callback={handleNumberPatients} />
                <ButtonDark text="PDF" callback={handleNumberPatientsPDF} />
              </div>
            </Box>
          </Modal>
          <ButtonDark text="Email" callback={handleSubmit} />
        </>
      )}
      <h1><a href="http://localhost:5500/Welcome.html">App Help</a></h1>
    </Wrapper>
    
  )
}

export default Home;
