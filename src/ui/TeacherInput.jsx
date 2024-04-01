import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #d1d5db;
  background-color: #fff;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  box-shadow:  0 1px 2px rgba(0, 0, 0, 0.04);
  
  &:disabled {
    background-color: lightgray; /* Set the disabled text color to grey */
  }
`;

export default Input;
