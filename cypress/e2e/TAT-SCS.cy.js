describe('TAT Customer Service Center', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  })

  it('checks the application title', () => {
    cy.title()
      .should('eq', 'TAT Customer Service Center');
  });

  it('fills in the required fields and submits the form', () => {
      const longText = Cypress._.repeat('Lorem Ipsum ', 20)
      cy.get('#firstName')
        .type('First Name');
      cy.get('#lastName')
        .type('Last Name');
      cy.get('#email')
        .type('email@email.com');
      cy.get('#open-text-area')
        .type(longText, {delay: 0});
      cy.get('button.button')
        .click();

      cy.get('.success')
        .should('be.visible');
  });

  it('displays an error message when submitting the form with an email with invalid formatting', () => {
    cy.get('#firstName')
        .type('First Name');
      cy.get('#lastName')
        .type('Last Name');
      cy.get('#email')
        .type('email@email');
      cy.get('#open-text-area')
        .type('Thank you Cypress');
      cy.get('button.button')
        .click();

      cy.get('.error')
        .should('be.visible');
  });

  it('phone number form validation', () => {
    cy.get('#phone')
      .type('abcd')
      .should('have.value', '');

    cy.get('#phone')
      .type('5555555555')
      .should('have.value', '5555555555')
  });

  it('displays an error message when the phone becomes required but is not filled in before the form submission', () => {
    cy.get('#firstName')
        .type('First Name');
      cy.get('#lastName')
        .type('Last Name');
      cy.get('#email')
        .type('email@email.com');
      cy.get('#phone-checkbox')
        .click();
      cy.get('#open-text-area')
        .type('Thank you Cypress');
      cy.get('button.button')
        .click();

      cy.get('.error')
        .should('be.visible');
  });

  it('fills and clears the first name, last name, email, and phone fields', () => {
    cy.get('#firstName')
        .type('First Name')
        .should('have.value', 'First Name')
        .clear()
        .should('have.value', '');
      cy.get('#lastName')
        .type('Last Name')
        .should('have.value', 'Last Name')
        .clear()
        .should('have.value', '');
      cy.get('#email')
        .type('email@email.com')
        .should('have.value', 'email@email.com')
        .clear()
        .should('have.value', '');
      cy.get('#phone')
        .type('5555555555')
        .should('have.value', '5555555555')
        .clear()
        .should('have.value', '');
  });

  it('displays an error message when submitting the form without filling the required fields', () => {
    cy.get('button[type="submit"]')
      .click();

    cy.get('.error')
      .should('be.visible');
  });

  it.only('successfully submits the form using a custom command', () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get('.success')
      .should('be.visible');
  })
})