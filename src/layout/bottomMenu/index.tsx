import { BottomNavigation, BottomNavigationAction, Paper } from "src/UI/MUI";
import { SupportAgent, People, Login } from "src/UI/MUI/icons";

export interface IProps {
  handleSignUpFormOpen: () => void;
  handleLogInFormOpen: () => void;
}

function BottomMenu({ handleSignUpFormOpen, handleLogInFormOpen }: IProps) {
  return (
    <Paper id="bottom-menu" sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
          // TODO: 각 메뉴에따라 history.push 혹은 모달 open
          const signUp = newValue === 1;
          const logIn = newValue === 2;

          if (signUp) {
            handleSignUpFormOpen();
          }

          if (logIn) {
            handleLogInFormOpen();
          }
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
