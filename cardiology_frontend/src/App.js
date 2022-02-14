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
import PostParameter from "./components/PostParameter";
import PutParameter from "./components/PutParameter";
import PostTemplate from "./components/PostTemplate";
import PutTemplate from "./components/PutTemplate";
// Context
import UserProvider from "./context";
// Styles
import { GlobalStyle } from "./GlobalStyles";

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/doctor-profile/:doctorId' element={<Doctor />} />
            <Route path='/update-doctor/:doctorId' element={<UpdateDoctorProfile />} />
            <Route path='/patient-profile/:patientId' element={<Patient />} />
            <Route path='/update-patient/:patientId' element={<UpdatePatientProfile />} />
            <Route path='/patient/:patientId' element={<PatientVisualizer />} />
            <Route path='/post-parameter' element={<PostParameter />} />
            <Route path='/put-parameter/:parameterId' element={<PutParameter />} />
            <Route path='/post-template' element={<PostTemplate />} />
            <Route path='/put-template/:templateId' element={<PutTemplate />} />
          </Routes>
          <GlobalStyle />
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
