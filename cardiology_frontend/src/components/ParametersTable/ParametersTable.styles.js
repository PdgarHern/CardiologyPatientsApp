import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
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
    vertical-align: top;
    }

    tbody tr:nth-of-type(odd) {
      background-color: rgba(0, 0, 0, .05)
    }

    tbody tr:hover {
      background-color: rgba(0, 0, 0, .075)
    }
    
  }

  .checkbox {
    width: 20px;
    margin: 0;
  }

  #id {
    display: none;
  }

`
