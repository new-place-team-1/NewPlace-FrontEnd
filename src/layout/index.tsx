import { Fragment, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { sizeBoundary } from "src/config/device";
import Header from "src/layout/header";
import BottomMenu from "src/layout/bottomMenu";
import SignUpForm from "src/domain/users/signUpForm";
import SignInForm from "src/domain/users/signInForm";
import { Snackbar, Alert } from "src/components/MUI";

function Layout() {
  const [isSignUpFormModalOpen, setIsSignUpFormModalOpen] = useState<boolean>(false);
  const [isSignInFormModalOpen, setIsSignInFormModalOpen] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const isDesktopsize = useMediaQuery({
    query: `(min-width: ${sizeBoundary}px)`,
  });

  const handleSignUpFormOpen = () => {
    setIsSignUpFormModalOpen(true);
  };

  const handleSignUpFormClose = () => {
    setIsSignUpFormModalOpen(false);
  };

  const handleSignInFormOpen = () => {
    setIsSignInFormModalOpen(true);
  };

  const handleSignInFormClose = () => {
    setIsSignInFormModalOpen(false);
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
      <Header handleSignUpFormOpen={handleSignUpFormOpen} handleSignInFormOpen={handleSignInFormOpen} />
      {!isDesktopsize && (
        <BottomMenu handleSignUpFormOpen={handleSignUpFormOpen} handleSignInFormOpen={handleSignInFormOpen} />
      )}
      <SignUpForm
        open={isSignUpFormModalOpen}
        handleClose={handleSignUpFormClose}
        handleSignInFormOpen={handleSignInFormOpen}
        handleSnackbarOpen={handleSnackbarOpen}
        size={isDesktopsize ? "medium" : "small"}
      />
      <SignInForm
        size={isDesktopsize ? "medium" : "small"}
        open={isSignInFormModalOpen}
        handleClose={handleSignInFormClose}
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
