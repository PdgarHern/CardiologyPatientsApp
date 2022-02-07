import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root {
    --maxWidth: 1280px;

    --white: #fff;
    --lightGreen: #76f3ad;
    --darkGreen: #37ba78;
    --lightGrey: #eee;
    --medGrey: #353535;
    --darkGrey: #1c1c1c;
    --black: #000;

    --fontExtraBig: 2.5rem;
    --fontBig: 1.5rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
  }

  * {
    box-sizing: border-box;
    font-family: 'Abel', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;

    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--black);
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
    }

    p {
      font-size: 1rem;
      color: var(--darkGrey);
    }

    label {
      font-weight: bold;
      margin-right: 5px;
    }

    input {
      width: 320px;
      height: 30px;
      border: 1px solid var(--darkGrey);
      border-radius: 20px;
      margin: 10px 0;
      padding: 10px;
    }

    select {
      width: 100px;
      height: 30px;
      border: 1px solid var(--darkGrey);
      border-radius: 10px;
    }

    option {
      font-size: var(--fontSmall);
    }

    .spinner {
      display: flex;
      justify-content: center;
    }

    .error {
      color: red;
      font-size: var(--fontBig);
    }

    .formError {
      color: red;
      font-size: var(--fontMed);
    }

    .logout {
      display: flex;
      justify-content: center;
      margin-top: 80px;
      font-size: var(--fontExtraBig);
    }

  }

`;
