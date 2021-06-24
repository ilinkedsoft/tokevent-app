describe('Tokigames E2E Test', () => {
  it('Header Link functinos', () => {
    cy.visit('/events');

    cy.get('[data-test-id="about-link"]').click();
    cy.url().should('include', '/about');

    cy.get('[data-test-id="events-link"]').click();
    cy.url().should('include', '/events');
  });
  
  it('Events page functions', () => {
    cy.visit('/events');

    cy.get('.MuiCard-root').first().as('first-card').click();
    cy.get('@first-card').within(() => {
      cy.get('[data-test-id="action-button"]').should('to.have.text', 'Remove from Entries');
    });
    cy.get('[data-test-id="header-entries"]').should('to.have.text', 'Events (1 Entries)');

    cy.get('.MuiCard-root').eq(1).as('second-card');
    cy.get('@second-card').within(() => {
      cy.get('@second-card').click();
      cy.get('[data-test-id="action-button"]').should('to.have.text', 'Remove from Entries');
    });
    cy.get('[data-test-id="header-entries"]').should('to.have.text', 'Events (2 Entries)');

    cy.get('@second-card').click();
    cy.get('@first-card').click();
    cy.get('@first-card').within(() => {
      cy.get('[data-test-id="action-button"]').should('to.have.text', 'Add to Entries');
    });
    cy.get('@second-card').within(() => {
      cy.get('[data-test-id="action-button"]').should('to.have.text', 'Add to Entries');
    });
    cy.get('[data-test-id="header-entries"]').should('to.have.text', 'Events (0 Entries)');
  });
});