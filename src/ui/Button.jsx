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
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
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
  color: var(--color-grey-600);
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);

  &:hover {
    background-color: var(--color-grey-50);
  }
`,

trans: css`
color: white;
background: transparent;
border: 1px solid var(--color-grey-200);

&:hover {
  background-color: transparent;
  color: #e4e3e3;
}
`,

danger: css`
color: var(--color-red-100);
background-color: var(--color-red-700);

&:hover {
  background-color: var(--color-red-800);
}
`,
light: css`
color: var(--color-grey-600);
background: var(--color-green-500);
border: 1px solid var(--color-grey-200);

&:hover {
  background-color: var(--color-green-500);
}
`,
};


const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

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