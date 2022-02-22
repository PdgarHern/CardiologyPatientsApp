import React from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../../API";
// Images
import AppLogo from "../../images/appLogo.png";
import Login from "../../images/login.png";
import Logout from "../../images/logout.png";
// Styles
import { Wrapper, Content, LogoImg, UserImg } from "./Header.styles";


const Header = () => {
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
    } catch (error) {}

  }

  return (
    <Wrapper>
      <Content>
        <LogoImg src={AppLogo} alt='app-logo' onClick={handleHome} />
        <div>
          <UserImg src={Login} alt='login' onClick={handleLogIn} />
          {localStorage.userId && (
            <UserImg src={Logout} alt='logout' onClick={handleLogOut} />
          )}
        </div>
      </Content>
    </Wrapper>
  )
  
}

export default Header;
