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

    // Validate URL
    cy.location()
      .its('pathname')
      .should('eq', `/new`)

    // Fill form
    cy.get(':nth-child(1) > .j-row--fullwidth > :nth-child(1) > .j-col > .j-input')
      .type(API_NAME)

    cy.get('#is-active')
      .click()

    cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .j-col > .j-input')
      .type(API_PATH)

    cy.get('#react-select-2--value > .Select-placeholder')
      .click()
      .get('.Select-menu-outer > * > *:nth-child(1)')
      .click()

    cy.get(':nth-child(1) > .j-control > .j-icon')
      .click()
      .get('.j-row__item > .j-input')
      .type(API_TARGET_URL)

    cy.get('#react-select-3--value > .Select-placeholder')
      .click()
      .get('.Select-menu-outer > * > *:nth-child(1)')
      .click()

    cy.get('#strip-path-true')
      .click()

    cy.get(':nth-child(3) > .j-row > :nth-child(1) > .j-col > .j-input')
      .type(API_HEALTH_CHECK_PATH)

    // Save
    cy.get(':nth-child(2) > .j-button')
      .click()
      .get('.j-buttons__wrapper > .j-button--primary')
      .click()

    // Toaster Check
    cy.get('.j-toaster__right-part')
      .contains(API_NAME)
  })

  it('should add the API endpoint correctly', () => {
    // Validate that API has been created correctly
    // Search
    cy.get('.j-search-bar__input')
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

    cy.get('#react-select-8--value > .Select-value')
      .contains('roundrobin')
      .get('.j-row__item > .j-input')
      .should('have.value', API_TARGET_URL)

    cy.get('#strip-path-true')

    cy.get(':nth-child(3) > .j-row > :nth-child(1) > .j-col > .j-input')
      .should('have.value', API_HEALTH_CHECK_PATH)
  })
})
