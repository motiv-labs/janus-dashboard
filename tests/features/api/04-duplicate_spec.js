const UUID = Math.random().toString(36).replace(/[0-9]/g, '').substring(1)
const API_NAME = `duplicate-api-${UUID}`
const API_PATH = `/${API_NAME}`
const API_TARGET_URL = `http://localhost/${API_NAME}`
const API_HEALTH_CHECK_PATH = `http://localhost/${API_NAME}/status`

describe('Duplicating API', () => {
  it('should work properly', () => {
    cy.loginVisit('/')
    cy.fixture('seed.json').then(SEED_API => {

      // Find the item and click `duplicate`
      cy.get('.j-search-bar__input', { timeout: 100000 })
        .type(SEED_API.name)
      cy.get('.j-table__tbody')
        .contains(SEED_API.name)
      cy.get('a[href^="/preview/"] ~ a[href="/new"] > .j-icon--type-copy')
        .click()

      // Fill missing fields
      cy.get(':nth-child(1) > .j-row--fullwidth > :nth-child(1) > .j-col > .j-input', { timeout: 10000 })
        .type(API_NAME)

      cy.get('[name="proxy.listen_path"]')
        .clear()
        .type(API_PATH)

      cy.get('[name="proxy.upstreams.targets[0].target"]')
        .clear()
        .type(API_TARGET_URL)

      cy.get('[name="health_check.url"]')
        .clear()
        .type(API_HEALTH_CHECK_PATH)

      // Save
      cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
        .click()
        .get('.j-confirmation__buttons-group > .j-button--primary')
        .click()
    })
  })

  it('should duplicate the API endpoint correctly', () => {
    cy.loginVisit('/')

    // Validate that API has been created correctly
    // Search
    cy.get('.j-search-bar__input', { timeout: 100000 })
      .type(API_NAME)

    // Validate that item is created in API List Page
    cy.get('.j-table__tbody')
      .contains(API_NAME)

    // Open preview page
    cy.get('[href^="/preview"] > .j-icon')
      .click()

    // Validate URL
    cy.location()
      .its('pathname')
      .should('eq', `/preview/${API_NAME}`)

    // Validate Form
    cy.get(':nth-child(1) > .j-row--fullwidth > :nth-child(1) > .j-col > .j-input')
      .should('have.value', API_NAME)

    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .j-col > .j-input')
      .should('have.value', API_PATH)

    cy.get('input[name="token_strategy.name"]')
      .should('have.value', 'roundrobin')
    cy.get('input[name="proxy.upstreams.targets[0].target"]')
      .should('have.value', API_TARGET_URL)

    cy.get(':nth-child(3) > .j-row > :nth-child(1) > .j-col > .j-input')
      .should('have.value', API_HEALTH_CHECK_PATH)
  })
})
