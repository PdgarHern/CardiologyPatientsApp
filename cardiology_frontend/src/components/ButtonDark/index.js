import React from "react";
// Styles
import { Wrapper } from "./ButtonDark.styles";

const ButtonDark = ({ text, callback }) => (
  <Wrapper type="button" onClick={callback}>
    {text}
  </Wrapper>
);

export default ButtonDark;
