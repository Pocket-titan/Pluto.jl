import styled, { css } from "styled-components/macro";

export const LogoContainer = styled.div`
  grid-column: 2;
  height: 60px;
  padding: 0.5em;
  box-sizing: border-box;
  transition: filter 250ms ease-in-out;

  ${({ theme }) =>
    theme.isDark &&
    css`
      filter: invert(1) contrast(0.6) hue-rotate(90deg) saturate(1.3);
      /* filter: invert(1) hue-rotate(180deg) brightness(0.75) saturate(1.2); */
    `}
`;

export const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  transition: all 250ms ease-in-out;

  ${({ theme }) =>
    theme.isDark
      ? css`
          background-color: hsl(223, 13%, 10%);
          border-bottom: 1px solid hsl(223, 13%, 10%);
        `
      : css`
          background-color: hsl(290, 3%, 90%);
          border-bottom: 1px solid hsl(0, 0%, 65%);
          /* box-shadow: inset 0 1px 1px black; */
        `}
`;