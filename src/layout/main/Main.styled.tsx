import styled from "@emotion/styled";

import { headerSmallHeight, headerLargeHeight } from "src/config/styles/layoutSize";
import palette from "src/config/styles/palette";

interface IProps {
  isDesktopSize: boolean;
}

const StyledMain = styled.main`
  width: 100%;
  background-color: ${palette.background.main};
  margin-top: ${({ isDesktopSize }: IProps) => (isDesktopSize ? `${headerLargeHeight}px` : `${headerSmallHeight}px`)};
  padding: 8px;
`;

export default StyledMain;
