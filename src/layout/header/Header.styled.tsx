import styled from "@emotion/styled";

import palette from "src/utils/styles/palette";

export const StyledMobileHeader = styled.header`
  height: 30px;
  box-shadow: 0 2px 2px 0 ${palette.layoutShadow};
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    margin: auto;
  }

  svg {
    margin: 8px;
  }
`;

export const StyledDesktopHeader = styled.header`
  height: 60px;
  padding: 0 80px;
  box-shadow: 0 3px 3px 0 ${palette.layoutShadow};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;

  .header-right-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      margin: 20px;
    }
    div:last-child {
      margin-right: 0;
    }
  }
`;
