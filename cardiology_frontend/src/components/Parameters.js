import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import BreadCrumb from "./BreadCrumb";
import ParametersTable from "./ParametersTable";
import ButtonDark from "./ButtonDark";
// Styles
import { Wrapper } from "./Lists.styles";

const Parameters = () => {
  const navigate = useNavigate();

  const handleAuth = () => {
    navigate("/login");
  }

  return (
    <> 
      {localStorage.userRol != "doctor" && (
        handleAuth()
      )}
      <BreadCrumb text={"Parameters"} linkPath={`/doctor-profile/${localStorage.userId}`} />
      <Wrapper>
        <ParametersTable updatable={true} />
      </Wrapper>
    </>
  )
}

export default Parameters;
