import { mount } from "@cypress/react";
import { ThemeProvider } from "@mui/material/styles";

import DropDownMenu from ".";
import { AccountCircle } from "src/UI/MUI/icons";
import theme from "src/utils/contexts/Theme";

describe("DropDownMenu", () => {
  beforeEach(function () {
    this.props = {
      Icon: AccountCircle,
      menuItems: [
        {
          label: "마이페이지",
          onClick: cy.stub(),
        },
        {
          label: "파트너 신청",
          onClick: cy.stub(),
        },
        {
          label: "로그아웃",
          onClick: cy.stub(),
        },
      ],
    };
    mount(
      <ThemeProvider theme={theme}>
        <DropDownMenu {...this.props} />
      </ThemeProvider>,
    );
  });

  it("Given menuItems, Then render Icon, not items yet", function () {
    cy.get(".drop-down-menu-container").as("dropDownMenuContainer");
    cy.get("@dropDownMenuContainer").find(".drop-down-menu-icon");
    cy.get("@dropDownMenuContainer").find(".drop-down-menu-item").should("have.length", 0);
  });

  it("When click Icon to toggle, Then render items", function () {
    cy.get(".drop-down-menu-icon").click();
    cy.get(".drop-down-menu-container .drop-down-menu-item").should($elements => {
      expect($elements).to.have.length(3);
      expect($elements.eq(0)).to.contain("마이페이지");
      expect($elements.eq(1)).to.contain("파트너 신청");
      expect($elements.eq(2)).to.contain("로그아웃");
    });
  });

  it("When click each item, Then call each onClick callback", function () {
    cy.get(".drop-down-menu-icon").click();
    cy.get(".drop-down-menu-container .drop-down-menu-item")
      .as("items")
      .each($element => {
        cy.wrap($element).click();
      });
    cy.get("@items").each((_, index) => {
      expect(this.props.menuItems[index].onClick).to.be.calledOnce;
    });
  });
});
