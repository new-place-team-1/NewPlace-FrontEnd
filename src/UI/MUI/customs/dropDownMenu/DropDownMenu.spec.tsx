import DropDownMenu, { IProps } from ".";
import { AccountCircle } from "src/UI/MUI/icons";
import setUp from "src/utils/test/setUp";

describe("DropDownMenu", () => {
  beforeEach(() => {
    const defaultProps: IProps = {
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

    setUp(DropDownMenu, defaultProps);
    cy.wrap(defaultProps).as("defaultProps");
  });

  it("Given menuItems, Then render Icon, not items yet", () => {
    cy.get(".drop-down-menu-container").as("dropDownMenuContainer").should("exist");
    cy.get("@dropDownMenuContainer").find(".drop-down-menu-icon").should("exist");
    cy.get("@dropDownMenuContainer").find(".drop-down-menu-item").should("have.length", 0);
  });

  it("When click Icon to toggle, Then render items", () => {
    cy.get(".drop-down-menu-icon").click();

    cy.get(".drop-down-menu-container .drop-down-menu-item").should($elements => {
      expect($elements).to.have.length(3);
      expect($elements.eq(0)).to.contain("마이페이지");
      expect($elements.eq(1)).to.contain("파트너 신청");
      expect($elements.eq(2)).to.contain("로그아웃");
    });
  });

  it("When click each item, Then call each onClick callback", () => {
    cy.get(".drop-down-menu-icon").click();
    cy.get(".drop-down-menu-container .drop-down-menu-item")
      .as("items")
      .each(($element, index) => {
        cy.wrap($element).click();

        cy.get("@defaultProps").its("menuItems").its(index).its("onClick").should("be.calledOnce");
      });
  });
});
