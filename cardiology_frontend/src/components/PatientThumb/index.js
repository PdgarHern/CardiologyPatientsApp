import React from "react";
import { useNavigate } from "react-router-dom";
// Styles
import { Wrapper, Image } from "./PatientThumb.styles";

const PatientThumb = ({ id, name, imageUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/patient/${id}`);
  }

  return(
    <Wrapper>
      <Image src={imageUrl} alt='actor-thumb' onClick={handleClick} />
      <h3>{name}</h3>
    </Wrapper>
  )
  
}

export default PatientThumb;
