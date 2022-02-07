import React from "react";
// Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Doctor from "./components/Doctor";
import Patient from "./components/Patient";
// Context
import UserProvider from "./context";

function App() {
  return (
    <>
      <h1>Cardiology Frontend</h1>
      <Router>
        <UserProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/doctor-profile/:doctorId' element={<Doctor />} />
            <Route path='/patient-profile/:patientId' element={<Patient />} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
