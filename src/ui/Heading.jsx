import styled, { css } from "styled-components";

// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: yellow"}
// `;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === "heading1" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 20px;
    `}

    ${(props) =>
    props.as === "heading2" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      font-family: 'Roboto Slab';
      color: black;
      padding-left: 80px;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      font-family: 'Merriweather', serif;
      color: white;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2.5rem;
      font-weight: 500;
      /* font-family: 'Permanent Marker', cursive; */
      font-family: 'Bangers';
      color: white;
    `}

    ${(props) =>
    props.as === "heading3" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      /* font-family: 'Permanent Marker', cursive; */
      font-family: 'Merriweather', serif;
      color: black;
      padding-left: 550px;
    `}

    ${(props) =>
    props.as === "head3" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      /* font-family: 'Permanent Marker', cursive; */
      font-family: 'Merriweather', serif;
      color: black;
      padding-left: 10px;
      padding-top: 40px;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 0.9rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      color: white;
      padding: 5px;
    `}

    ${(props) =>
    props.as === "heading4" &&
    css`
      font-size: 1.2rem;
      font-weight: 500;
      /* font-family: 'Permanent Marker', cursive; */
      font-family: "Poppins", sans-serif;
      color: white;
    `}
    
    line-height: 1.4;
`;

export default Heading;