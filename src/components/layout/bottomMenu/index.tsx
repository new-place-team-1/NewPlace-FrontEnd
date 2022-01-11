import { BottomNavigation, BottomNavigationAction, Paper } from "src/components/MUI";
import { SupportAgent, People, Login } from "src/components/MUI/icons";

function BottomMenu() {
  return (
    <Paper id="bottom-menu" sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
          console.log(newValue);
        }}
      >
        {/* TODO: 로그인 상태에 따라 다른 메뉴들 */}
        <BottomNavigationAction label="고객센터" icon={<SupportAgent />} />
        <BottomNavigationAction label="회원가입" icon={<People />} />
        <BottomNavigationAction label="로그인" icon={<Login />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomMenu;
