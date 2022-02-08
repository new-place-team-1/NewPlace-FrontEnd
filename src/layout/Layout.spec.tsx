import Layout from ".";
import setUp from "src/utils/test/setUp";
import { viewportSizeForTest } from "src/config/device";

describe("Layout", () => {
  beforeEach(() => {
    setUp(Layout);
  });

  describe("When viewport width <= 992, Then mobile view", () => {
    beforeEach(() => {
      cy.viewport(viewportSizeForTest.mobile.width, viewportSizeForTest.mobile.height);
    });

    it("Render header, footer, BottomMenu", () => {
      cy.get("header").should("exist");
      cy.get("footer").should("exist");
      cy.get("#bottom-menu").should("exist");
    });
  });

  describe("When viewpoprt width > 992, Then Desktop view", () => {
    beforeEach(() => {
      cy.viewport(viewportSizeForTest.desktop.width, viewportSizeForTest.desktop.height);
    });

    it("Render header, footer, not BottomMenu", () => {
      cy.get("header").should("exist");
      cy.get("footer").should("exist");
      cy.get("#bottom-menu").should("not.exist");
    });
  });
});
