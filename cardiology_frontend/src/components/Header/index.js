import React from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../../API";
// Hook
import { useDoctorFetch } from "../../hooks/useDoctorFetch";
// Images
import AppLogo from "../../images/appLogo.png";
import Login from "../../images/login.png";
import Logout from "../../images/logout.png";
import Logout2 from "../../images/logout2.png";
// Styles
import { Wrapper, Content, LogoImg, UserImg, LogoutImg } from "./Header.styles";


const Header = () => {
  const { state: doctorInfo, loading, error } = useDoctorFetch(localStorage.userId);

  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  }

  const handleLogIn = () => {
    if (localStorage.userId) {
      if (localStorage.userRol === 'doctor') {
        navigate(`/doctor-profile/${localStorage.userId}`);

      } else if (localStorage.userRol === 'patient') {
        navigate(`/patient-profile/${localStorage.userId}`);

      }

    } else {
      navigate('/login');
    }

  }

  const handleLogOut = async () => {
    try {
      await API.logout();

      localStorage.removeItem('userId');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userRol');
      localStorage.removeItem('userHosp');
      sessionStorage.removeItem('patientId');
      sessionStorage.removeItem('doctorId');

      navigate('/');
      window.location.reload();
    } catch (error) {}

  }

  return (
    <Wrapper>
      <Content>
        <LogoImg src={AppLogo} alt='app-logo' onClick={handleHome} />
        <div>
          <UserImg id="loginIcon" src={Login} alt='login' onClick={handleLogIn} />
          {localStorage.userId && (
            <LogoutImg id="logoutIcon" src={Logout2} alt='logout' onClick={handleLogOut} />
          )}
        </div>
      </Content>
    </Wrapper>
  )
  
}

export default Header;
