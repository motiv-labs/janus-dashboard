const JANUS_URL = 'http://localhost:8081'
const UUID = Math.random().toString(36).replace(/[0-9]/g, '').substring(1)
const API_NAME = `test-api-${UUID}`
const API_PATH = `/test-api-${UUID}`
const API_TARGET_URL = `http://localhost/${UUID}`
const API_HEALTH_CHECK_PATH = `http://localhost/${UUID}/status`

describe('API List Page', () => {
  it('should be accessible', () => {
    cy.loginVisit('/')
      .then(() => cy.log(localStorage.getItem('access_token')))
      .then(() => expect(localStorage.getItem('access_token')).to.exist)
      .get('.j-title').should('contain', 'APIs')
  })

  it('should be able to add a new API Endpoint', () => {
    cy.loginVisit('/new')

    // Fill form
    cy.get(':nth-child(1) > .j-row--fullwidth > :nth-child(1) > .j-col > .j-input', { timeout: 10000 })
      .type(API_NAME)

    cy.get('#is-active')
      .click()

    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .j-col > .j-input')
      .type(API_PATH)

    cy.get('#react-select-2--value > .Select-input > input')
      .type('roundrobin{enter}', { force: true })

    cy.get(':nth-child(1) > .j-control > .j-icon')
      .click()
      .get('.j-row__item > .j-input')
      .type(API_TARGET_URL)

    cy.get('#react-select-3--value > .Select-input > input')
      .type('all{enter}', { force: true })

    cy.get('#strip-path-true')
      .click()

    cy.get(':nth-child(3) > .j-row > :nth-child(1) > .j-col > .j-input')
      .type(API_HEALTH_CHECK_PATH)

    // Save
    cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
      .click()
      .get('.j-buttons__wrapper > .j-button--primary')
      .click()
  })

  it('should add the API endpoint correctly', () => {
    cy.loginVisit('/')

    // Validate that API has been created correctly
    // Search
    cy.get('.j-search-bar__input', { timeout: 100000 })
      .type(API_NAME)

    // Validate that item is created in API List Page
    cy.get('.j-table__tbody')
      .contains(API_NAME)

    // Open preview page
    cy.get('[href^="/preview/test-api-"] > .j-icon')
      .click()

    // Validate URL
    cy.location()
      .its('pathname')
      .should('eq', `/preview/${API_NAME}`)

    // Validate Form
    cy.get(':nth-child(1) > .j-row--fullwidth > :nth-child(1) > .j-col > .j-input')
      .should('have.value', API_NAME)

    cy.get('#is-active')
      .should('have.value', 'true')

    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .j-col > .j-input')
      .should('have.value', API_PATH)

    cy.get('input[name="token_strategy.name"]')
      .should('have.value', 'roundrobin')
    cy.get('input[name="proxy.upstreams.targets[0].target"]')
      .should('have.value', API_TARGET_URL)

    cy.get('#strip-path-true')

    cy.get(':nth-child(3) > .j-row > :nth-child(1) > .j-col > .j-input')
      .should('have.value', API_HEALTH_CHECK_PATH)
  })
})
