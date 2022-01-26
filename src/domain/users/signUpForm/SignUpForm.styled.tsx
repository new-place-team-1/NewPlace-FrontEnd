import styled from "@emotion/styled";

import palette from "src/utils/styles/palette";

export const StyledBox = styled.div`
  background-color: ${palette.background.main};
`;

export const StyledBoxItem = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
`;
