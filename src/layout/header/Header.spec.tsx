import Header, { IProps } from ".";
import setUp from "src/utils/test/setUp";
import { viewportSizeForTest } from "src/config/device";

describe("Header", () => {
  const defaultProps: IProps = {
    isDesktopSize: false,
    handleLogInFormOpen: () => {},
    handleSignUpFormOpen: () => {},
  };

  beforeEach(() => {
    setUp(Header, defaultProps);
  });

  it("When viewport width <= 992, Then render MobileHeader", () => {
    cy.viewport(viewportSizeForTest.mobile.width, viewportSizeForTest.mobile.height);

    cy.get("#mobile-header").should("exist");
  });

  it("When viewport width > 992, Then render DesktopHeader", () => {
    setUp(Header, { ...defaultProps, isDesktopSize: true });

    cy.viewport(viewportSizeForTest.desktop.width, viewportSizeForTest.desktop.height);

    cy.get("#desktop-header").should("exist");
  });
});
