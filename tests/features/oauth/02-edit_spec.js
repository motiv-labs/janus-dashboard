const NEW_RATE_LIMIT = 480
const WEIGHT = 100

describe('Editing OAuth Server', () => {
  it('should work properly', () => {
    cy.loginVisit('/oauth/servers')

    cy.fixture('seed_oauth_server.json').then(oauthJSON => {
      // Validate that API has been created correctly
      cy.get('.j-search-bar__input')
        .type(oauthJSON.name)
      cy.get('a[href="/oauth/servers/seed_oauth_server"] > .j-icon--type-edit')
        .click()

      // Validate URL
      cy.location()
        .its('pathname')
        .should('eq', `/oauth/servers/${oauthJSON.name}`)

      // Disable CORS
      cy.get('input[name="cors_meta.enabled"][value="false"]')
        .click()

      // Update Rate Limit
      cy.get('input[name="rate_limit.limit.value"]')
        .clear()
        .type(NEW_RATE_LIMIT)

      // Update OAuth Endpoint Load Balancing Algorithm
      cy.get('#react-select-8--value > .Select-input > input')
        .click({ force: true })
        .type("{downarrow}{enter}", { force: true })

      // Input weight
      cy.get('input[name="oauth_endpoints.introspect.upstreams.targets[0].weight"]')
        .clear()
        .type(WEIGHT)

      // Save
      cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
        .click()
        .get('.j-confirmation__buttons-group > .j-button--primary')
        .click()
    })
  })

  it('should edit the OAuth Server correctly', () => {
    cy.loginVisit('/oauth/servers')

    cy.fixture('seed_oauth_server.json').then(oauthJSON => {
      // Validate that API has been created correctly
      cy.get('.j-search-bar__input')
        .type(oauthJSON.name)
      cy.get('a[href="/oauth/servers/seed_oauth_server"] > .j-icon--type-edit')
        .click()

      // Validate URL
      cy.location()
        .its('pathname')
        .should('eq', `/oauth/servers/${oauthJSON.name}`)

      // Validate CORS toggle
      cy.get('input[name="cors_meta.enabled"][value="false"]')
        .should('be.checked')

      // Validate rate limit
      cy.get('input[name="rate_limit.limit.value"]')
        .should('have.value', `${NEW_RATE_LIMIT}`)

      // Validate OAuth Endpoint Load Balancing Algorithm
      cy.get('#react-select-8--value')
        .contains('weight')

      // Validate that the host URL is unchanged
      cy.get('input[name="oauth_endpoints.introspect.upstreams.targets[0].target"]')
        .should('have.value', oauthJSON.oauth_endpoints.introspect.upstreams.targets[0].target)

      // Validate weight
      cy.get('input[name="oauth_endpoints.introspect.upstreams.targets[0].weight"]')
        .should('have.value', `${WEIGHT}`)
    })
  })
})
