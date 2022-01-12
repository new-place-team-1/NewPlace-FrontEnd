import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";

import { sizeBoundary } from "src/config/device";
import Header from "src/layout/header";
import BottomMenu from "src/layout/bottomMenu";

function Layout() {
  const isDesktopsize = useMediaQuery({
    query: `(min-width: ${sizeBoundary}px)`,
  });

  return (
    <Fragment>
      <Header />
      {!isDesktopsize && <BottomMenu />}
    </Fragment>
  );
}

export default Layout;
