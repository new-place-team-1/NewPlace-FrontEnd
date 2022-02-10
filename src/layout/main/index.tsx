import { StyledMain, StyledMainContent } from "./Main.styled";
import MainRoutes from "src/routes/MainRoutes";

interface IProps {
  isDesktopSize: boolean;
}

function Main({ isDesktopSize }: IProps) {
  return (
    <StyledMain isDesktopSize={isDesktopSize}>
      <StyledMainContent>
        <MainRoutes />
      </StyledMainContent>
    </StyledMain>
  );
}

export default Main;
