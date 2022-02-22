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
      vertical-align: center;
    }

    tbody tr:nth-of-type(odd) {
      background-color: rgba(0, 0, 0, .05)
    }

    tbody tr:hover {
      background-color: rgba(0, 0, 0, .075)
    }
    
  }

  #id {
    display: none;
  }

`

export const Image = styled.img`
  bottom: 40px;
  z-index: 100;
  width: 100%;
  max-width: 100px;
  height: 100%;
  max-height: 100px;
  transition: all 0.3s;
  object-fit: cover;
  border-radius: 100%;
  animation: animateThumb 0.5s;

  @keyframes animateThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    max-width: 100px;
    max-height: 100px;
  }

`
