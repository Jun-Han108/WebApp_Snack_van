/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/vendor");
  });

  // https://on.cypress.io/interacting-with-elements

  it("test if put request was sent fine", () => {
    // https://on.cypress.io/type

    cy.request({
      method: "GET",
      url: "http://localhost:5000/vendor",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }).then((resp) => {
      // redirect status code is 200
      expect(resp.status).to.eq(200);
    });

    //change status
  });
});
