import { Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import StyledFooter from "./Footer.styled";
import { sizeBoundary } from "src/config/device";

function Footer() {
  const isDesktopsize = useMediaQuery({
    query: `(min-width: ${sizeBoundary}px)`,
  });

  return (
    <StyledFooter isDesktopsize={isDesktopsize}>
      <nav>
        <Link to="/policy/contract">이용약관</Link>
        <Link to="/policy/privacy">개인정보 처리방침</Link>
        <Link to="/policy/cancellation">취소 및 환불 정책</Link>
      </nav>
      <address>
        <Typography variant="caption" component="p">
          상호명 (주)굿플레이스 | 대표 강보람 | 개인정보보호책임자 채희영 |사업자등록번호 209-81-55339 사업자정보확인
        </Typography>
        <Typography variant="caption" component="p">
          통신판매업신고번호 2019-서울서초-0260 | 서울특별시 서초구 강남대로 327, 대륭서초타워 18층(서초동)
        </Typography>
        <Typography variant="caption" component="p">
          대표번호 : 1670-8208 | 일반 문의 09:00-22:00 | 연중무휴 / 점심 12:00-13:00
        </Typography>
      </address>
    </StyledFooter>
  );
}

export default Footer;
