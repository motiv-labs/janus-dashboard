describe('Import JSON', () => {
  it('should work properly', () => {
    cy.loginVisit('/')

    cy.fixture('import.json').then(IMPORT_API => {
      // Click [Import JSON] button
      cy.get('.j-buttons__wrapper > a[href="/new"] + div > button')
        .click()

      // Prepare file upload
      const file = JSON.stringify(IMPORT_API, null, 2)
      const fileArray = file.split('\n')
      const fileObject = new File(fileArray, 'import.json', { type: 'application/json' })
      const dropEvent = {
        dataTransfer: {
          files: [
            fileObject
          ]
        }
      }

      // Execute File upload
      cy.get('.uploader')
        .trigger('drop', dropEvent).then(() => {

        // Confirm upload
        cy.get('.j-confirmation-container > .j-confirmation__buttons-group > .j-button--primary')
          .click({ force: true })
          .get('.j-confirmation__buttons-group > .j-button--primary')
          .click()

        // Validate that imported api endpoint is created
        cy.loginVisit('/')
        cy.get('.j-search-bar__input', { timeout: 100000 })
          .type(IMPORT_API.name)
          .get('.j-table__tbody')
          .contains(IMPORT_API.name)
      })
    })
  })
})
