import { Routes, Route } from "react-router-dom";

import StyledMain from "./Main.styled";
import Policy from "src/templates/policy";

interface IProps {
  isDesktopSize: boolean;
}

function Main({ isDesktopSize }: IProps) {
  return (
    <StyledMain isDesktopSize={isDesktopSize}>
      <Routes>
        <Route path="/">
          <Route path="policy/:tab" element={<Policy />} />
        </Route>
      </Routes>
    </StyledMain>
  );
}

export default Main;
