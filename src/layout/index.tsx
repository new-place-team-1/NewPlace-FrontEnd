import { Fragment, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { sizeBoundary } from "src/config/device";
import Header from "src/layout/header";
import BottomMenu from "src/layout/bottomMenu";
import SignUpForm from "src/domain/users/signUpForm";
import SignInForm from "src/domain/users/signInForm";

function Layout() {
  const [isOpenSignUpFormModal, setIsOpenSignUpFormModal] = useState<boolean>(false);
  const [isOpenSignInFormModal, setIsOpenSignInFormModal] = useState<boolean>(false);
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

  return (
    <Fragment>
      <Header handleSignUpFormOpen={handleSignUpFormOpen} />
      {!isDesktopsize && <BottomMenu handleSignUpFormOpen={handleSignUpFormOpen} />}
      {isOpenSignUpFormModal && (
        <SignUpForm
          open={isOpenSignUpFormModal}
          handleClose={handleSignUpFormClose}
          handleOpenSignInModal={handleSignInFormOpen}
          size="small"
          // TODO: 소셜로그인 추가되고 모달창 내용물 많아지면, size={isDesktopsize ? "big" : "small"}
        />
      )}
      {isOpenSignInFormModal && <SignInForm open={isOpenSignInFormModal} onClose={handleSignInFormClose} />}
    </Fragment>
  );
}

export default Layout;
