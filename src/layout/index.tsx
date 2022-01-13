import { Fragment, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { sizeBoundary } from "src/config/device";
import Header from "src/layout/header";
import BottomMenu from "src/layout/bottomMenu";
import SignUpForm from "src/domain/users/signUpForm";
import SignInForm from "src/domain/users/signInForm";
import { Snackbar, Alert } from "src/components/MUI";

function Layout() {
  const [isOpenSignUpFormModal, setIsOpenSignUpFormModal] = useState<boolean>(false);
  const [isOpenSignInFormModal, setIsOpenSignInFormModal] = useState<boolean>(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const isDesktopsize = useMediaQuery({
    query: `(min-width: ${sizeBoundary}px)`,
  });

  const handleSignUpFormOpen = () => {
    setIsOpenSignUpFormModal(true);
  };

  const handleSignUpFormClose = () => {
    setIsOpenSignUpFormModal(false);
  };

  const handleSignInFormOpen = () => {
    setIsOpenSignInFormModal(true);
  };

  const handleSignInFormClose = () => {
    setIsOpenSignInFormModal(false);
  };

  const handleSnackbarOpen = (message: string) => {
    setIsOpenSnackbar(true);
    setSnackbarMessage(message);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpenSnackbar(false);
  };

  return (
    <Fragment>
      <Header handleSignUpFormOpen={handleSignUpFormOpen} />
      {!isDesktopsize && <BottomMenu handleSignUpFormOpen={handleSignUpFormOpen} />}
      {isOpenSignUpFormModal && (
        <SignUpForm
          open={isOpenSignUpFormModal}
          handleClose={handleSignUpFormClose}
          handleSignInFormOpen={handleSignInFormOpen}
          handleSnackbarOpen={handleSnackbarOpen}
          size="small"
          // TODO: 소셜로그인 추가되고 모달창 내용물 많아지면, size={isDesktopsize ? "big" : "small"}
        />
      )}
      {isOpenSignInFormModal && <SignInForm open={isOpenSignInFormModal} onClose={handleSignInFormClose} />}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isOpenSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} variant="filled" severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default Layout;
