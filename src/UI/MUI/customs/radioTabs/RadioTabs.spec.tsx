import RadioTabs, { IProps } from ".";
import setUp from "src/utils/test/setUp";

describe("RadioTabs", () => {
  beforeEach(() => {
    const defaultProps: IProps = {
      tabIndex: 1,
      tabsProps: [
        { label: "숙소", id: "lodging-tab", className: "lodging-tab" },
        { label: "체험", id: "experience-tab", className: "experience-tab" },
      ],
      onChange: cy.stub().as("onChange"),
    };

    setUp(RadioTabs, defaultProps);
  });

  it("Given props, Then render tabs", () => {
    cy.get(".radio-tabs .lodging-tab").should("not.have.class", "Mui-selected");
    cy.get(".radio-tabs .experience-tab").should("have.class", "Mui-selected");
  });

  it("When click tab, Then change active tab, And call onChange", () => {
    cy.get(".lodging-tab").click();

    cy.get("@onChange").should("have.been.calledOnce");
  });
});
