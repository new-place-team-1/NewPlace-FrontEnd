import styled from "@emotion/styled";

import { headerSmallHeight, headerLargeHeight } from "src/config/styles/layoutSize";
import palette from "src/config/styles/palette";

export const StyledMobileHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${headerSmallHeight}px;
  background-color: white;
  box-shadow: 0 2px 2px 0 ${palette.layoutShadow};
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;

  .logo {
    margin: auto;
  }

  svg {
    margin: 8px;
  }
`;

export const StyledDesktopHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${headerLargeHeight}px;
  padding: 0 80px;
  background-color: white;
  box-shadow: 0 3px 3px 0 ${palette.layoutShadow};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  z-index: 9999;

  .header-right-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      margin: 20px;
    }
    button:last-child {
      margin-right: 0;
    }
  }
`;
