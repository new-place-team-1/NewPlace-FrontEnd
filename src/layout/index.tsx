import { Fragment, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { sizeBoundary } from "src/config/device";
import Header from "src/layout/header";
import BottomMenu from "src/layout/bottomMenu";
import SignUpForm from "src/domain/user/signUpForm";

function Layout() {
  const [isOpenSignUpFormModal, setIsOpenSignUpFormModal] = useState<boolean>(false);
  const isDesktopsize = useMediaQuery({
    query: `(min-width: ${sizeBoundary}px)`,
  });

  const handleSignUpFormOpen = () => {
    setIsOpenSignUpFormModal(true);
  };

  const handleSignUpFormClose = () => {
    setIsOpenSignUpFormModal(false);
  };

  return (
    <Fragment>
      <Header handleSignUpFormOpen={handleSignUpFormOpen} />
      {!isDesktopsize && <BottomMenu handleSignUpFormOpen={handleSignUpFormOpen} />}
      {isOpenSignUpFormModal && (
        <SignUpForm
          open={isOpenSignUpFormModal}
          onClose={handleSignUpFormClose}
          size={isDesktopsize ? "big" : "small"}
        />
      )}
    </Fragment>
  );
}

export default Layout;
