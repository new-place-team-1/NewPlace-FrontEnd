import { mount } from "@cypress/react";

import RadioTabs from ".";
import { ThemeProvider } from "@mui/material/styles";
import theme from "src/utils/contexts/Theme";

describe("RadioTabs", () => {
  beforeEach(function () {
    this.props = {
      tabIndex: 1,
      tabsProps: [
        { label: "숙소", id: "lodging-tab", className: "lodging-tab" },
        { label: "체험", id: "experience-tab", className: "experience-tab" },
      ],
      onChange: cy.stub().as("onChange"),
    };
    mount(
      <ThemeProvider theme={theme}>
        <RadioTabs {...this.props} />
      </ThemeProvider>,
    );
  });

  it("Given props, Then render tabs", function () {
    cy.get(".radio-tabs .lodging-tab").should("not.have.class", "Mui-selected");
    cy.get(".radio-tabs .experience-tab").should("have.class", "Mui-selected");
  });

  it("When click tab, Then change active tab, And call onChange", function () {
    cy.get(".lodging-tab").click();
    cy.get("@onChange").should("have.been.calledOnce");
  });
});
