import React from "react";
// Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
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
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
