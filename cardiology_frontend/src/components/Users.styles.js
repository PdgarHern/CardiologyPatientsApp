import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  max-width: var(--maxWidth);
  padding: 20px;
  color: var(--darkGrey);

  label {
    font-weight: bold;
  }

  input {
    width: 320px;
    height: 30px;
    border: 1px solid var(--darkGrey);
    border-radius: 20px;
    margin: 10px 0;
    padding: 10px;
  }

  #selectTemplate {
    width: 175px;
  }

  #image {
    border: 0;
  }

  #posterImg {
    max-width: 300px;
    border-radius: 10px;
  }

  #thumbImg {
    max-width: 150px;
    border-radius: 10px;
  }

  #img {
    max-width: 150px;
    border-radius: 10px;
  }

  .bottomLine {
    width: 100%;
    height: 80px;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }

  .sendMessage {
    width: 50%;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin: 0;
    flex: 1;
    

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
    }

  }

  #thisUser {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 50px;
    background-color: #a3a3a3;
    border-radius: 50px;
    margin-left: 20%;
    margin-bottom: 10px;
  }

  #otherUser {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 50px;
    border: 1px #535353 solid;
    border-radius: 50px;
    margin-right: 20%;
    margin-bottom: 10px;
  }

  .chatMessages {
    width: 100%;
    max-width: 600px;
    margin-bottom: 80px;
  }

`;

export const ActionButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 0;
  max-width: var(--maxWidth);

  .button {
    display: flex;
    justify-content: center;
    width: 25%;
  }

  .triggerPopup {
    display: block;
    background: var(--darkGreen);
    width: 25%;
    min-width: 200px;
    height: 60px;
    border-radius: 30px;
    color: var(--white);
    border: 0;
    font-size: var(--fontBig);
    margin: 0px;
    transition: all 0.3s;
    outline: none;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }

    @media screen and (max-width: 768px) {
      min-width: 120px;
      font-size: var(--fontMed);
    }
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }

`

export const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  width: 100%;
  margin: 0 auto;
  padding: 0;

  .column {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 20px;
    margin: 0;
    flex: 1;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }

    .checkBox {
      display: flex;
      align-items: center;
      input {
        width: 60px;
      }
    }

    h1 {
      color: var(--darkGrey);
    }

    strong {
      font-size: var(--fontBig);
    }

    @media screen and (max-width: 768px) {
      display: flex;

      .column {
        margin: 20px 0;
      }
    }
  }

  .infoColumn {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      margin: 0;
      flex: 1;

      :first-child {
        margin-left: 0;
      }

      :last-child {
        margin-right: 0;
      }

      strong {
        font-size: var(--fontBig);
        padding-bottom: 20px;

        @media screen and (max-width: 1000px) {
          font-size: var(--fontMed);
        }

      }

      @media screen and (max-width: 768px) {
        padding-bottom: 20px;
      }

  }

  .tables {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    border-radius: 20px;
    margin: 0;
    flex: 1;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }

    h1 {
      color: var(--darkGrey);
    }

    @media screen and (max-width: 768px) {
      display: flex;

      .column {
        margin: 20px 0;
      }
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

`
