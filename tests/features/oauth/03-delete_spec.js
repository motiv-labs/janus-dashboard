describe('Delete OAuth Server', () => {
  it('should work properly', () => {
    cy.loginVisit('/oauth/servers')

    cy.fixture('seed_oauth_server').then(oauthJSON => {
      // Search
      cy.get('.j-search-bar__input', { timeout: 100000 })
        .type(oauthJSON.name)

      // Delete
      cy.get('a[href="/oauth/servers/seed_oauth_server"] + button > .j-icon--type-delete')
        .click()
        .get('.j-buttons__wrapper > .j-button--primary')
        .click()

      // Validate that api endpoint is deleted
      cy.get('.j-search-bar__input', { timeout: 100000 })
        .clear()
        .type(oauthJSON.name)
        .get('.j-table__tbody')
        .should('not.contain', oauthJSON.name)
    })
  })
})
