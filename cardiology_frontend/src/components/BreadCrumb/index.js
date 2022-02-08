import React from "react";
import { Link } from "react-router-dom";
// Styles
import { Wrapper, Content } from "./BreadCrumb.styles";

const BreadCrumb = ({ text, linkPath }) => (
  <Wrapper>
    <Content>
      <Link to={linkPath}>
        <span>Back</span>
      </Link>
      {text && 
        <>
          <span>|</span>
          <span>{text}</span>
        </>
      }
    </Content>
  </Wrapper>
);

export default BreadCrumb;
