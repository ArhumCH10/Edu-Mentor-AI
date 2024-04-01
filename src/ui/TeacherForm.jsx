import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: #fff;
      border: 1px solid #f3f4f6;
      border-radius: 5px;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;