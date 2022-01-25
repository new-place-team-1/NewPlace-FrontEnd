import { mount } from "@cypress/react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";

import Footer from ".";
import theme from "src/utils/contexts/Theme";

describe("Footer", () => {
  it("Render Links on Footer", () => {
    mount(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>,
    );

    cy.get("footer");
    cy.contains("이용약관").should("exist");
    cy.contains("개인정보 처리방침").should("exist");
    cy.contains("취소 및 환불 정책").should("exist");
  });
});
