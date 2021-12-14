import { mount } from "@cypress/react";

import App from "./App";

describe("App test", () => {
  it("App", () => {
    mount(<App />);

    cy.get(".App").should("have.text", "Edit src/App.tsx and save to reload.Learn React");
  });
});
