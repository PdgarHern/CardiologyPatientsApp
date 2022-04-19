import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// Styles
import { Wrapper } from "./Users.styles";
import { HomeContent, ContentImages, Image } from "./Home.styles";
// Images
import PatientIcon from "../images/newPatientIcon.png";
import TemplateIcon from "../images/templateIcon.png";
import ProfileIcon from "../images/newProfileIcon.png";

const Home = () => {
  const navigate = useNavigate();

  const handleAuth = () => {
    navigate('/login');
  }

  useEffect(() => {
    if(!localStorage.userId) {
      handleAuth()
    }
    
  }, [])

  return (
    <>
      {/* {!localStorage.userId && (
        handleAuth()
      )} */}
      <Wrapper>
        <HomeContent>
          <h1>Select an option</h1>
          <ContentImages>
            {localStorage.userRol == 'doctor' ? (
              <>
                <Link to="/patients-list">
                  <div className="homeElement">
                    <Image src={PatientIcon} alt="Not-Found" />
                    <h3>Patients</h3>
                  </div>
                </Link>
                <Link to="/post-template">
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
                <Link to={`/my-followups/${sessionStorage.patientId}`}>
                  <div className="homeElement">
                    <Image src={TemplateIcon} alt="Not-Found" />
                    <h3>Follow-ups</h3>
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
            ) }
          </ContentImages>
        </HomeContent>
      </Wrapper>
    </>
  )
}

export default Home;
