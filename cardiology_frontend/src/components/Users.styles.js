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

  .actionButtons {
    width: 50%;
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
    padding-bottom: 200px;
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
