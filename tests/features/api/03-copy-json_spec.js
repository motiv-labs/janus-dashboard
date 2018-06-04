describe('Copy as JSON', () => {
  it('should work properly', () => {
    cy.loginVisit('/')

    cy.fixture('seed_api.json').then(SEED_API => {
      // Find the item and click `copy as json`
      cy.get('.j-search-bar__input', { timeout: 100000 })
        .type(SEED_API.name)
      cy.get('.j-table__tbody')
        .contains(SEED_API.name)
      cy.get('.j-table__controls > button:nth-last-child(2)')
        .click()
      cy.get('.j-confirmation-wrapper .j-button--primary')

      // Get the json output and compare to the fixture
      const api = cy.document().then(doc => {
        return JSON.parse(doc.querySelector('.ace_content').textContent)
      }).then(object => {
        expect(JSON.stringify(SEED_API)).to.equal(JSON.stringify(object))
      })
    })
  })
})
