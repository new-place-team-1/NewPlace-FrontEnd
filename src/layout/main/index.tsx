import { Routes, Route } from "react-router-dom";

import { StyledMain, StyledMainContent } from "./Main.styled";
import Policy from "src/templates/policy";

interface IProps {
  isDesktopSize: boolean;
}

function Main({ isDesktopSize }: IProps) {
  return (
    <StyledMain isDesktopSize={isDesktopSize}>
      <StyledMainContent>
        <Routes>
          <Route path="/">
            <Route path="policy/:tab" element={<Policy />} />
          </Route>
        </Routes>
      </StyledMainContent>
    </StyledMain>
  );
}

export default Main;
