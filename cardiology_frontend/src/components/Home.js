import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import ButtonDark from "./ButtonDark";
// Styles
import { Wrapper } from "./Users.styles";

const Home = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <Wrapper>
      <ButtonDark text="Register" callback={handleRegister} />
      <ButtonDark text="Login" callback={handleLogin} />
      <h1><a href="http://localhost:5500/Welcome.html">App Help</a></h1>
    </Wrapper>
    
  )
}

export default Home;
