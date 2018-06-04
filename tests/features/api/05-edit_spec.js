const UUID = Math.random().toString(36).replace(/[0-9]/g, '').substring(1)
const API_NAME = `edited-api-${UUID}`
const API_PATH = `/${API_NAME}`
const API_TARGET_URL = `http://localhost/${API_NAME}`
const API_HEALTH_CHECK_PATH = `http://localhost/${API_NAME}/status`

describe('Editing API', () => {
  it('should work properly', () => {
    cy.loginVisit('/')
    cy.fixture('seed_api.json').then(SEED_API => {

      // Find the item and click `edit`
      cy.get('.j-search-bar__input', { timeout: 100000 })
        .type(SEED_API.name)
      cy.get('.j-table__tbody')
        .contains(SEED_API.name)
      cy.get('a[href^="/preview/"] + a > .j-icon--type-edit')
        .click()

      // Validate URL
      cy.location()
        .its('pathname')
        .should('eq', `/${SEED_API.name}`)

      // Edit API endpoint
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

  it('should edit the API endpoint correctly', () => {
    cy.loginVisit('/')

    cy.fixture('seed_api.json').then(SEED_API => {
      // Validate that API has been created correctly
      // Search
      cy.get('.j-search-bar__input', { timeout: 100000 })
        .type(SEED_API.name)

      // Validate that item is created in API List Page
      cy.get('.j-table__tbody')
        .contains(SEED_API.name)

      // Open preview page
      cy.get('[href^="/preview"] > .j-icon')
        .click()

      // Validate URL
      cy.location()
        .its('pathname')
        .should('eq', `/preview/${SEED_API.name}`)

      // Validate Form
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
})
