const API_NAME = 'seed-api';

describe('Delete API Endpoint', () => {
  it('should work properly', () => {
    cy.loginVisit('/')

    // Search
    cy.get('.j-search-bar__input', { timeout: 100000 })
      .type(API_NAME)
      .get('.j-table__tbody')
      .contains(API_NAME)

    // Delete
    cy.get('[href="/preview/seed-api"] ~ .j-control > .j-icon--type-delete')
      .click()
      .get('.j-buttons__wrapper > .j-button--primary')
      .click()

    // Validate that api endpoint is deleted
    cy.get('.j-search-bar__input', { timeout: 100000 })
      .clear()
      .type(API_NAME)
      .get('.j-table__tbody')
      .should('not.contain', API_NAME)
  })
})
