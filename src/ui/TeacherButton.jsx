import styled, { css } from "styled-components";

const sizes = {
    extraSmall: css`
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: #eef2ff;
    background-color: #4f46e5;

    &:hover {
      background-color: #4338ca;
    }
  `,
   different: css`
   color: #eef2ff;
   background-color: darkgreen;

   &:hover {
     background-color:  green;
   }
 `,
  secondary: css`
  color: #4b5563;
  background: #fff;
  border: 1px solid #e5e7eb;

  &:hover {
    background-color: #f9fafb;
  }
`,

trans: css`
color: white;
background: transparent;
border: 1px solid #e5e7eb;

&:hover {
  background-color: transparent;
  color: #e4e3e3;
}
`,

danger: css`
color: #fee2e2;
background-color: #b91c1c;

&:hover {
  background-color: #991b1b;
}
`,
light: css`
color: #4b5563;
background: #00ff0a;
border: 1px solid #e5e7eb;

&:hover {
  background-color: #00ff0a;
}
`,
};


const Button = styled.button`
  border: none;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  ${props=> sizes[props.size]}
  ${props => variations[props.variation]}
  ${props => props.disabled && css`
    cursor: not-allowed;
    background-color:  green;
    color: white;
    // ... any other disabled styles you want to apply ...
  `}
`;

Button.defaultProps = {
  variation: 'primary',
  size: 'small',
}

export default Button;