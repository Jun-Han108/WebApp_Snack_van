/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/vendor/login");
  });

  // https://on.cypress.io/interacting-with-elements

  it(".type() - type into a DOM element", () => {
    // https://on.cypress.io/type
    cy.get('input[id="van name"]')
      .type("Coffee2Go")
      .should("have.value", "Coffee2Go")

      // .type() with special character sequences
      .type("{leftarrow}{rightarrow}{uparrow}{downarrow}")
      .type("{del}{selectall}{backspace}")

      // .type() with key modifiers
      .type("{alt}{option}") //these are equivalent
      .type("{ctrl}{control}") //these are equivalent
      .type("{meta}{command}{cmd}") //these are equivalent
      .type("{shift}")

      // Delay each keypress by 0.1 sec
      .type("Coffee2Go", { delay: 100 })
      .should("have.value", "Coffee2Go");

    cy.get('input[id="password"]').type("hihi").should("have.value", "hihi");
    cy.get("button").contains("Sign In").trigger("mouseover").click();

    cy.get('input[id="locDetail"]')
      .type("Anythingaskjdlkvabdsjvbklbdsav")
      .should("have.value", "Anythingaskjdlkvabdsjvbklbdsav");

    cy.get("button").contains("open").trigger("mouseover").click();
    cy.get("a").contains("Logout").trigger("mouseover").click();

    cy.end();

    //change status
  });
});
