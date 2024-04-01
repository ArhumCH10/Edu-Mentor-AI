import styled from "styled-components";
import PropTypes from 'prop-types';

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 12rem 1fr 1.2fr;
  gap: 2rem;
  padding: 0.7rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
  font-family: "Poppins", sans-serif;
`;

const Error = styled.span`
  font-size: 0.7rem;
  color: #b91c1c;
`;

export default function TeacherStyledFormRow({labelName, error, children}) {
  return (
    <FormRow>
    <Label htmlFor={children.props.id}>{labelName}</Label>
     {children}
    {error && <Error>{error}</Error>}
  </FormRow>
  )
}

TeacherStyledFormRow.propTypes = {
    labelName: PropTypes.string.isRequired, // Validate labelName as a required string
    error: PropTypes.string, // Validate error as a string (optional)
    children: PropTypes.node.isRequired, // Validate children as a required node (React node)
  };
