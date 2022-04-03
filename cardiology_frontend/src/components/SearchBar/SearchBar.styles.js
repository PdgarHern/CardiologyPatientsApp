import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;

`

export const SearchInput = styled.input`
  width: 88% !important;
  height: 40px !important;
  border-radius: 10px 0 0 10px !important;
  border: 1px solid var(--medGrey) !important;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--darkGrey);

  ::placeholder {
    font-weight: 400;
  }

`;

export const CleanButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
  height: 40px;
  border-radius: 0 10px 10px 0;
  border: 1px solid var(--medGrey);
  background: white;

`;

export const SearchImage = styled.img`
  position: absolute;
  width: 30px;

  filter: brightness(0) invert(0.2);

`;

export const CleanIcon = styled.img`
  width: 20px;

`;
