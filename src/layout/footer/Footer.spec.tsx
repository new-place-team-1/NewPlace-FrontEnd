import Footer from ".";
import setUp from "src/utils/test/setUp";

describe("Footer", () => {
  it("Render Links on Footer", () => {
    setUp(Footer);

    cy.get("footer");
    cy.contains("이용약관").should("exist");
    cy.contains("개인정보 처리방침").should("exist");
    cy.contains("취소 및 환불 정책").should("exist");
  });
});
