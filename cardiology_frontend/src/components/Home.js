import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jsreport from "@jsreport/browser-client";
// Components
import ButtonDark from "./ButtonDark";
// Styles
import { Wrapper } from "./Users.styles";
import { HomeContent, ContentImages, Image } from "./Home.styles";
// Images
import PatientList from "../images/listIcon.png";
import TemplateIcon from "../images/templateIcon.png";
import ProfileIcon from "../images/profileIcon.png";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <Wrapper>
      <HomeContent>
        <h1>Select an option</h1>
        <ContentImages>
          {localStorage.userId ? (
            <>
              <Link to="/patient-list">
                <div className="homeElement">
                  <Image src={PatientList} alt="Not-Found" />
                  <h3>Patients</h3>
                </div>
              </Link>
              <Link to="/template-list">
                <div className="homeElement">
                  <Image src={TemplateIcon} alt="Not-Found" />
                  <h3>Templates</h3>
                </div>
              </Link>
              {localStorage.userRol == 'doctor' ? (
                <Link to={`/doctor-profile/${localStorage.userId}`}>
                  <div className="homeElement">
                    <Image src={ProfileIcon} alt="Not-Found" />
                    <h3>Profile</h3>
                  </div>
                </Link>
              ) : (
                <Link to={`/patient-profile/${localStorage.userId}`}>
                  <div className="homeElement">
                    <Image src={ProfileIcon} alt="Not-Found" />
                    <h3>Profile</h3>
                  </div>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <div className="homeElement">
                  <Image src={PatientList} alt="Not-Found" />
                  <h3>Patients</h3>
                </div>
              </Link>
              <Link to="/login">
                <div className="homeElement">
                  <Image src={TemplateIcon} alt="Not-Found" />
                  <h3>Templates</h3>
                </div>
              </Link>
              <Link to="/login">
                <div className="homeElement">
                  <Image src={ProfileIcon} alt="Not-Found" />
                  <h3>Profile</h3>
                </div>
              </Link>
            </>
          )}


        </ContentImages>
      </HomeContent>
      {/* <ButtonDark text="Login" callback={handleLogin} /> */}
    </Wrapper>

  )
}

export default Home;
