import styled from "styled-components";

export const Wrapper = styled.div`
  background: var(--darkGreen);
  padding: 0 20px;
  box-shadow: 0px 1px 10px black;

`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--maxWidth);
  padding: 20px 0;
  margin: 0 auto;
  color: var(--white);
  

  a {
    color: var(--white);
    text-decoration: none;
  }

`;

export const LogoImg = styled.img`
  width: 100px;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    width: 80px;
  }

`;

export const UserImg = styled.img`
  padding-right: 10px;
  width: 60px;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    width: 50px;
  }

`

export const LogoutImg = styled.img`
  padding-right: 10px;
  width: 60px;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    width: 50px;
  }

`
