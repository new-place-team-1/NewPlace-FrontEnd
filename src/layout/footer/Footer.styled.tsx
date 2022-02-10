import styled from "@emotion/styled";

import palette from "src/config/styles/palette";
import { bottomMenuHeight } from "src/config/styles/layoutSize";

interface IProps {
  isDesktopSize: boolean;
}

const StyledFooter = styled.footer`
  width: 100%;
  background-color: white;
  padding: ${({ isDesktopSize }: IProps) => (isDesktopSize ? "14px" : "6px")} clamp(6px, 8vw, 170px);
  margin-bottom: ${({ isDesktopSize }: IProps) => (isDesktopSize ? 0 : `${bottomMenuHeight}px`)};

  p,
  a,
  a:visited,
  a:active {
    color: ${palette.font.lightRed};
  }

  nav {
    text-align: center;
    margin-bottom: ${({ isDesktopSize }: IProps) => (isDesktopSize ? "6px" : "2px")};

    a {
      margin: 0 ${({ isDesktopSize }: IProps) => (isDesktopSize ? "35px" : "7px")};
      font-size: 14px;
    }
  }
`;

export default StyledFooter;
