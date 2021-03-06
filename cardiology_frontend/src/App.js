import React from "react";
// Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Doctor from "./components/Doctor";
import UpdateDoctorProfile from "./components/UpdateDoctorProfile";
import Patient from "./components/Patient";
import UpdatePatientProfile from "./components/UpdatePatientProfile";
import PatientVisualizer from "./components/PatientVisualizer";
import PatientsList from "./components/PatientsList";
import Parameters from "./components/Parameters";
import PostParameter from "./components/PostParameter";
import PutParameter from "./components/PutParameter";
import Templates from "./components/Templates";
import PostTemplate from "./components/PostTemplate";
import PutTemplate from "./components/PutTemplate";
import PostFollowup from "./components/PostFollowup";
import TemplateVisualizer from "./components/TemplateVisualizer";
import FollowUpVisualizer from "./components/FollowUpVisualizer";
import PatientFollowUps from "./components/PatientFollowUps";
import PutAnswer from "./components/PutAnswer";
import RegisterGoogle from "./components/RegisterGoogle";
import Chat from "./components/Chat";
import ChatsVisualizer from "./components/ChatsVisualizer";
// Context
import UserProvider from "./context";
// Styles
import { GlobalStyle } from "./GlobalStyles";
import RegisterPatient from "./components/Register-Patient";

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/register-patient' element={<RegisterPatient />} />
            <Route path='/login' element={<Login />} />
            <Route path='/doctor-profile/:doctorId' element={<Doctor />} />
            <Route path='/update-doctor/:doctorId' element={<UpdateDoctorProfile />} />
            <Route path='/patient-profile/:patientId' element={<Patient />} />
            <Route path='/update-patient/:patientId' element={<UpdatePatientProfile />} />
            <Route path='/patient/:patientId' element={<PatientVisualizer />} />
            <Route path='/patients-list' element={<PatientsList />} />
            <Route path='/parameters' element={<Parameters />} />
            <Route path='/post-parameter' element={<PostParameter />} />
            <Route path='/put-parameter/:parameterId' element={<PutParameter />} />
            <Route path="/templates" element={<Templates />} />
            <Route path='/post-template' element={<PostTemplate />} />
            <Route path='/put-template/:templateId' element={<PutTemplate />} />
            <Route path='/post-followup' element={<PostFollowup />} />
            <Route path='/template/:templateId' element={<TemplateVisualizer />} />
            <Route path='/followup/:followupId' element={<FollowUpVisualizer />} />
            <Route path='/my-followups/:patientId' element={<PatientFollowUps />} />
            <Route path='/put-answer/:answerId' element={<PutAnswer />} />
            <Route path='/google-login' element={<RegisterGoogle />} />
            <Route path='/chat/:chatId' element={<Chat />} />
            <Route path='/chats-visualizer/:patientId' element={<ChatsVisualizer />} />
          </Routes>
          <GlobalStyle />
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
