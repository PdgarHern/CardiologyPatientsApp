import styled from "styled-components";

export const HomeContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 400px;
  background-color: #eee;
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    width: 90%;
    height: 300px;
  }

  @media screen and (max-width: 500px) {
    height: 700px;
  }

`;

export const ContentImages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;

  a {
    text-decoration: none;
    color: black;
  }

  * {
    margin: 5%;
  }

  .homeElement {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }

`;

export const Image = styled.img`
  width: 150px;

  @media screen and (max-width: 768px) {
    width: 100px;
  }

`;
