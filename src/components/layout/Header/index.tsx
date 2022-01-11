import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";

import { sizeBoundary } from "src/config/device";
import { ReactComponent as Logo } from "src/assets/images/logo.svg";
import { Button } from "src/components/MUI";
import { AccountCircle, ArrowBack } from "src/components/MUI/icons";
import { StyledMobileHeader, StyledDesktopHeader } from "./Header.styled";

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

function DesktopHeader() {
  return (
    <StyledDesktopHeader id="desktop-header">
      <Logo width={180} height={42} />
      <div className="header-right-container">
        {/* TODO: 로그인 여부에 따라 링크, 아이콘들 */}
        <div>고객센터</div>
        <div>회원가입</div>
        <div>
          <Button variant="outlined" size="large">
            로그인
          </Button>
        </div>
      </div>
    </StyledDesktopHeader>
  );
}

function Header() {
  const isDesktopsize = useMediaQuery({
    query: `(min-width: ${sizeBoundary}px)`,
  });

  return <Fragment>{isDesktopsize ? <DesktopHeader /> : <MobileHeader />}</Fragment>;
}

export default Header;
