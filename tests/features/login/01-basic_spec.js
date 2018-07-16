const USERNAME = 'admin'
const PASSWORD = 'admin'
const JANUS_ADMIN_URL = 'http://localhost:8081'

describe('Login page', () => {
  it('should have all required fields', () => {
    cy.visit('/login')
    cy.get('input[name="admin_url"]')
    cy.get('input[name="username"]')
    cy.get('input[name="password"]')
  })

  it('should work with basic authentication', () => {
    cy.visit('/login')
    cy.get('input[name="username"]')
      .type(USERNAME)
    cy.get('input[name="password"]')
      .type(PASSWORD)
    cy.get('button.login-form__button')
      .click()

    cy.location()
      .its('pathname')
      .should('eq', '/')
    cy.get('.j-header__user-name')
      .contains(USERNAME)
    cy.window().should(() => {
      expect(localStorage.username).to.eq(USERNAME)
      expect(localStorage.access_token).to.not.be.null
      expect(localStorage.admin_url).to.eq(JANUS_ADMIN_URL)
    })
  })
})
