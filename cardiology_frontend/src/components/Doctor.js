import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsreport from "@jsreport/browser-client";
// Components
import UserHeroImage from "./UserHeroImage";
import Grid from "./Grid";
import PatientThumb from "./PatientThumb";
import ButtonDark from "./ButtonDark";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// Hook
import { useDoctorFetch } from "../hooks/useDoctorFetch";
import { usePatientsFetch } from "../hooks/usePatientsFetch";
import { useDoctorsFetch } from "../hooks/useDoctorsFetch";
import { useHospitalFetch } from "../hooks/useHospitalFetch";
// Styles
import { Wrapper, Content } from "./Users.styles";
// Images
import UserPic from "../images/userpic.png";

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
  h1: { color: '#1c1c1c', marginLeft: '30%' },
  '.modalButtons': {
    display: 'flex',
    flexDirection: 'row',
  }
};

const Doctor = () => {
  const { state: doctorInfo, loading, error } = useDoctorFetch(localStorage.userId);
  const { state: patients } = usePatientsFetch();
  const { state: doctors } = useDoctorsFetch();
  const { state: hospital } = useHospitalFetch(localStorage.userHosp);

  const [openPatients, setOpenPatients] = useState(false);
  const [openFollowUps, setOpenFollowUps] = useState(false);

  const navigate = useNavigate();

  const handleParameter = () => {
    navigate('/post-parameter');
  }

  const handleTemplate = () => {
    navigate('/post-template');
  }

  const handlePatientsReport = async () => {
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'MyPatients'
      },
      data: {
        data: { hospital: localStorage.userHosp, patients: patients.results }
      }

    })

    report.openInWindow({ title: 'My Patients Report' });
  }

  const handlePatientsReportPDF = async () => {
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'MyPatients(pdf)'
      },
      data: {
        data: { hospital: localStorage.userHosp, patients: patients.results }
      }

    })

    report.openInWindow({ title: 'My Patients Report' });
  }

  const handleDoctorFollowups = async () => {
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'DoctorFollowups'
      },
      data: {
        data: doctors.results
      }

    })

    report.openInWindow({ title: 'My Patients Report' });
  }

  const handleDoctorFollowupsPDF = async () => {
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'DoctorFollowups(pdf)'
      },
      data: {
        data: doctors.results
      }

    })

    report.openInWindow({ title: 'My Patients Report' });
  }

  const handleOpenPatients = () => {
    setOpenPatients(true);
  }

  const handleOpenFollowUps = () => {
    setOpenFollowUps(true);
  }

  const handleClosePatients = () => {
    setOpenPatients(false);
  }

  const handleCloseFollowUps = () => {
    setOpenFollowUps(false);
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
      {localStorage.userId && doctorInfo[0] && (
        localStorage.setItem('userHosp', doctorInfo[0].hospital_id)
      )}
      {localStorage.userId && doctorInfo[0] && (
        sessionStorage.setItem('doctorId', doctorInfo[0].id)
      )}
      {doctorInfo[0] != null ? (
        <>
          <UserHeroImage
            userPic={doctorInfo[0].img == null
              ? UserPic
              : doctorInfo[0].img.url}
            name={doctorInfo[0].name}
          />
          <Content>
            <div className="infoColumn">
              <h1>Hospital: {hospital.name}</h1>
            </div>
            <div className="infoColumn">
              <h1>Phone Number: {doctorInfo[0].phoneNumber}</h1>
            </div>
          </Content>
          <Wrapper>
            <div className="actionButtons">
              <ButtonDark text="Parameters" callback={handleParameter} />
              <ButtonDark text="Templates" callback={handleTemplate} />
            </div>
          </Wrapper>
          <Grid header='Patients'>
            {patients.results.map(patient => (
              <>
                {patient.hospital_id == localStorage.userHosp ? (
                  <PatientThumb
                    key={patient.id}
                    id={patient.id}
                    name={patient.name}
                    imageUrl={
                      patient.img
                        ? patient.img.url
                        : UserPic

                    }
                    clickable
                  />
                ) : null}
              </>
            ))}
          </Grid>
          <Wrapper>
            <div className="actionButtons">
              <ButtonDark text="My Patients" callback={handleOpenPatients} />
              <Modal
                open={openPatients}
                onClose={handleClosePatients}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h1>Choose an option</h1>
                  <div className="modalButtons">
                    <ButtonDark text="Online" callback={handlePatientsReport} />
                    <ButtonDark text="PDF" callback={handlePatientsReportPDF} />
                  </div>
                </Box>
              </Modal>
              <ButtonDark text="Number of Follow-ups" callback={handleOpenFollowUps} />
              <Modal
                open={openFollowUps}
                onClose={handleCloseFollowUps}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h1>Choose an option</h1>
                  <div className="modalButtons">
                    <ButtonDark text="Online" callback={handleDoctorFollowups} />
                    <ButtonDark text="PDF" callback={handleDoctorFollowupsPDF} />
                  </div>
                </Box>
              </Modal>
            </div>
          </Wrapper>
        </>
      ) : null}
    </>
  )
}

export default Doctor;
