import styled, { css } from "styled-components";
export const Input = styled.input`
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid white;
  color: white;
  padding: 5px;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  margin: 4px;

  @media (min-width: 900px) {
    min-width: 250px;
  }
  width: 100%;
  &::placeholder {
    font-size: 15px;
  }

  outline: none;
`;
