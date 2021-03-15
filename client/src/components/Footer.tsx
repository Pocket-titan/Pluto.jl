import styled, { css } from "styled-components/macro";

const StyledFooter = styled.footer`
  height: 60px;
  margin-top: 2.04em;
  transition: all 250ms ease-in-out;

  ${({ theme }) =>
    theme.isDark
      ? css`
          background-color: hsl(223, 13%, 10%);
        `
      : css`
          background-color: hsl(290, 3%, 90%);
        `}
`;

const Footer = () => {
  return <StyledFooter></StyledFooter>;
};

export default Footer;
