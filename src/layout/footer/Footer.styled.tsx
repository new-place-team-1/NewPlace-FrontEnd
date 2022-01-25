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

  p {
    color: ${palette.font.lightRed};
  }
`;

export default StyledFooter;
