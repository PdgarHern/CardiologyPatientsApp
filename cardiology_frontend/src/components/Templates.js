import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import BreadCrumb from "./BreadCrumb";
import TemplatesTable from "./TemplatesTable";
import ButtonDark from "./ButtonDark";
// Styles
import { Wrapper } from "./Lists.styles";

const Templates = () => {
  const navigate = useNavigate();

  const handleAuth = () => {
    navigate("/login");
  }

  return (
    <>
      {localStorage.userRol != "doctor" && (
        handleAuth()
      )}
      <BreadCrumb text={"Templates"} linkPath={`/doctor-profile/${localStorage.userId}`} />
      <Wrapper>
        <TemplatesTable />
      </Wrapper>
    </>
  )
}

export default Templates;
