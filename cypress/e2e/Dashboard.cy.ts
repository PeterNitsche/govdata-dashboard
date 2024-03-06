describe("When opening the Dashboard page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.injectAxe();
  });

  it("shows a Dashboard", () => {
    cy.contains("Dashboard").should("be.visible");
    cy.contains("Search").should("be.visible");
  });

  it("has no A11Y violations", () => {
    cy.checkA11y();
  });
});
