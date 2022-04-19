import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  max-width: var(--maxWidth);
  padding: 20px;
  color: var(--darkGrey);

  .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
    border: 1px solid var(--lightGrey);

    td, th {
      padding: .75rem;
      vertical-align: center;
    }

    tbody tr:nth-of-type(odd) {
      background-color: rgba(0, 0, 0, .05)
    }

    tbody tr:hover {
      background-color: rgba(0, 0, 0, .075)
    }

    @media screen and (max-width: 500px) {
      font-size: 0.8rem;
    }
    
  }

  .addPatientButton {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .loadMoreButton {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    border: 1px solid #535353;
  }

`;