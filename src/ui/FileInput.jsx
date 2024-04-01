import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 0.5rem;
  border-radius: 4px;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.5rem 0.5rem;
    margin-right: 1rem;
    border-radius: 5px;
    border: none;
    color: #eef2ff;
    background-color: #4f46e5;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: #4338ca;
    }
  }
`;

export default FileInput;