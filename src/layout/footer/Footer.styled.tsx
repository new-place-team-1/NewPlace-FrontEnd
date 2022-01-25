import styled from "@emotion/styled";

import palette from "src/utils/styles/palette";
import { bottomMenuHeight } from "src/config/layoutSize";

interface IProps {
  isDesktopsize: boolean;
}

const StyledFooter = styled.footer`
  box-sizing: border-box;
  width: 100%;
  background-color: ${palette.background.main};
  padding: ${({ isDesktopsize }: IProps) => (isDesktopsize ? "14px" : "6px")} clamp(6px, 8vw, 170px);
  position: fixed;
  bottom: ${({ isDesktopsize }: IProps) => (isDesktopsize ? 0 : `${bottomMenuHeight}px`)};

  p,
  a,
  a:visited,
  a:active {
    color: ${palette.font.lightRed};
  }

  nav {
    text-align: center;
    margin-bottom: ${({ isDesktopsize }: IProps) => (isDesktopsize ? "6px" : "2px")};

    a {
      margin: 0 ${({ isDesktopsize }: IProps) => (isDesktopsize ? "35px" : "7px")};
      font-size: 14px;
    }
  }
`;

export default StyledFooter;
