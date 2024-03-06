describe("When opening the Dashboard page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.injectAxe();
  });

  it("has no A11Y violations", () => {
    cy.checkA11y();
  });

  it("shows the ministries and it's datasets in descending order", () => {
    cy.get("#dashboardTable")
      .find('[data-test-id="ministry-record"]')
      .should("have.length", 27)
      .should((records) => {
        expect(records[0]).to.contain.text("Statistisches Bundesamt");
        expect(records[0]).to.contain.text("2372");
        expect(records[1]).to.contain.text("Bundesministerium des Innern");
        expect(records[1]).to.contain.text("722");
      });
  });

  describe("When filtering the datasets", () => {
    it("shows the ministries matching the filter", () => {
      cy.get("#dashboardSearchInput").type("Bundesamt");
      cy.get("#dashboardTable")
        .find('[data-test-id="ministry-record"]')
        .should("have.length", 6)
        .should((records) => {
          expect(records[0]).to.contain.text("Statistisches Bundesamt");
          expect(records[0]).to.contain.text("2372");
          expect(records[1]).to.contain.text("Bundesamt für Justiz");
          expect(records[1]).to.contain.text("662");
        });
    });
  });
});
