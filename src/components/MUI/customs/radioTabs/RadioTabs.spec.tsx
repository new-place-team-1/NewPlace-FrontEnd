import { mount } from "@cypress/react";

import RadioTabs from ".";
import { ThemeProvider } from "@mui/material/styles";
import theme from "src/utils/contexts/Theme";

describe("RadioTabs", () => {
  beforeEach(function () {
    this.props = {
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

  it("Given tabsProps, Then render tabs", function () {
    cy.get(".radio-tabs .lodging-tab");
    cy.get(".radio-tabs .experience-tab");
  });

  it("When click tab, Then change active tab, And call onChange", function () {
    cy.get(".experience-tab").click().should("have.class", "Mui-selected");
    cy.get(".lodging-tab").should("not.have.class", "Mui-selected");
    cy.get("@onChange").should("have.been.calledOnce");
  });
});
