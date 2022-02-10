import { Fragment } from "react";

import { StyledMobileHeader, StyledDesktopHeader } from "./Header.styled";
import { ReactComponent as Logo } from "src/assets/images/logo.svg";
import { Button } from "src/UI/MUI";
import { AccountCircle, ArrowBack } from "src/UI/MUI/icons";

function MobileHeader() {
  return (
    <StyledMobileHeader id="mobile-header">
      {/* TODO: 뒤로가기, router history 있을때만 보이기 */}
      <ArrowBack color="primary" />
      <Logo className="logo" width={120} height={28} />
      {/* TODO: 로그인 상태에서만 아이콘 보이기, 클릭하면 드랍다운 메뉴*/}
      <AccountCircle color="primary" />
    </StyledMobileHeader>
  );
}

interface IPropsOfDesktopHeader {
  handleSignUpFormOpen: () => void;
  handleLogInFormOpen: () => void;
}

function DesktopHeader({ handleSignUpFormOpen, handleLogInFormOpen }: IPropsOfDesktopHeader) {
  return (
    <StyledDesktopHeader id="desktop-header">
      <Logo width={180} height={42} />
      <div className="header-right-container">
        {/* TODO: 로그인 여부에 따라 링크, 아이콘들 */}
        <Button color="secondary">고객센터</Button>
        <Button color="secondary" onClick={handleSignUpFormOpen}>
          회원가입
        </Button>
        <Button variant="outlined" size="large" onClick={handleLogInFormOpen}>
          로그인
        </Button>
      </div>
    </StyledDesktopHeader>
  );
}

export interface IProps {
  isDesktopSize: boolean;
  handleSignUpFormOpen: () => void;
  handleLogInFormOpen: () => void;
}

function Header({ isDesktopSize, handleSignUpFormOpen, handleLogInFormOpen }: IProps) {
  return (
    <Fragment>
      {isDesktopSize ? (
        <DesktopHeader handleSignUpFormOpen={handleSignUpFormOpen} handleLogInFormOpen={handleLogInFormOpen} />
      ) : (
        <MobileHeader />
      )}
    </Fragment>
  );
}

export default Header;
