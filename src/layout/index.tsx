import { Fragment, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { sizeBoundary } from "src/config/device";
import Header from "src/layout/header";
import Main from "src/layout/main";
import Footer from "src/layout/footer";
import BottomMenu from "src/layout/bottomMenu";
import SignUpForm from "src/domain/users/signUpForm";
import LogInForm from "src/domain/users/logInForm";
import { Snackbar, Alert } from "src/UI/MUI";

function Layout() {
  const [isSignUpFormModalOpen, setIsSignUpFormModalOpen] = useState<boolean>(false);
  const [isLogInFormModalOpen, setIsLogInFormModalOpen] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const isDesktopSize = useMediaQuery({
    query: `(min-width: ${sizeBoundary}px)`,
  });

  const handleSignUpFormOpen = () => {
    setIsSignUpFormModalOpen(true);
  };

  const handleSignUpFormClose = () => {
    setIsSignUpFormModalOpen(false);
  };

  const handleLogInFormOpen = () => {
    setIsLogInFormModalOpen(true);
  };

  const handleLogInFormClose = () => {
    setIsLogInFormModalOpen(false);
  };

  const handleSnackbarOpen = (message: string) => {
    setIsSnackbarOpen(true);
    setSnackbarMessage(message);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  return (
    <Fragment>
      <Header
        isDesktopSize={isDesktopSize}
        handleSignUpFormOpen={handleSignUpFormOpen}
        handleLogInFormOpen={handleLogInFormOpen}
      />
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Main isDesktopSize={isDesktopSize} />
        <Footer isDesktopSize={isDesktopSize} />
      </div>
      {!isDesktopSize && (
        <BottomMenu handleSignUpFormOpen={handleSignUpFormOpen} handleLogInFormOpen={handleLogInFormOpen} />
      )}
      <SignUpForm
        open={isSignUpFormModalOpen}
        handleClose={handleSignUpFormClose}
        size={isDesktopSize ? "medium" : "small"}
      />
      <LogInForm
        size={isDesktopSize ? "medium" : "small"}
        open={isLogInFormModalOpen}
        handleClose={handleLogInFormClose}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} variant="filled" severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default Layout;
