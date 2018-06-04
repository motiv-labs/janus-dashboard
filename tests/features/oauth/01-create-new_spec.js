describe('Create New OAuth Server', () => {
  it('should be able to add a new OAuth Server with Token Introspection', () => {
    cy.loginVisit('/oauth/servers/new')

    cy.fixture('oauth-introspection').then(oauthJSON => {
      // 1. General
      // OAuth Server Name
      cy.get('input[name="name"]')
        .type(oauthJSON.name)

      // 2. CORS
      // CORS Toggle
      cy.get('input[name="cors_meta.enabled"][value="true"]')
        .click()

      // CORS Domains
      cy.get('#react-select-2--value > .Select-input > input')
        .type('*{enter}', { force: true })

      // CORS Methods
      cy.get('#react-select-3--value > .Select-input > input')
        .type('All{enter}', { force: true })

      // CORS Request Headers
      cy.get('#react-select-4--value > .Select-input > input')
        .type('Origin{enter}', { force: true })
        .type('Authorization{enter}', { force: true })
        .type('Content-Type{enter}', { force: true })

      // CORS Exposed Headers
      cy.get('#react-select-5--value > .Select-input > input')
        .type('X-Debug-Token{enter}', { force: true })
        .type('X-Debug-Token-Link{enter}', { force: true })

      // 3. Rate Limit
      // Rate Limit Value
      cy.get('input[name="rate_limit.limit.value"]')
        .clear()
        .type(240)

      // Rate Limit Unit
      cy.get('#react-select-6--value > .Select-input')
        .click({ force: true })
        .type('{enter}', { force: true })

      // Rate Limit Toggle
      cy.get('input[name="rate_limit.enabled"][value="true"]')
        .click()

      // 4. Token Strategy
      // Strategy
      cy.get('#react-select-7--value > .Select-input')
        .click({ force: true })
        .type('{downarrow}', { force: true })
        .type('{enter}', { force: true })

      // OAuth Header Type
      cy.get('input[name="token_strategy.settings.auth_header_type"]')
        .type(oauthJSON.token_strategy.settings.auth_header_type)

      // OAuth Header Toggle
      cy.get('input[name="token_strategy.settings.use_auth_header"][value="true"]')
        .click()

      // Secrets
      // Add Fields
      cy.get('.j-api-form__inner:not([class$="--overflowed"]) .j-api-form__section:nth-of-type(4) > .j-api-form__row:last-child .j-row .j-icon--type-add')
        .click()
        .click()

      // Secret One
      cy.get('input[name="secrets[0].key"]')
        .type(Object.keys(oauthJSON.secrets)[0])

      cy.get('input[name="secrets[0].value"]')
        .type(oauthJSON.secrets[`${Object.keys(oauthJSON.secrets)[0]}`])

      // Secret Two
      cy.get('input[name="secrets[1].key"]')
        .type(Object.keys(oauthJSON.secrets)[1])

      cy.get('input[name="secrets[1].value"]')
        .type(oauthJSON.secrets[`${Object.keys(oauthJSON.secrets)[1]}`])

      // OAuth Endpoints
      // Introspect
      // Listen Path
      cy.get('input[name="oauth_endpoints.introspect.listen_path"]')
        .type(oauthJSON.oauth_endpoints.introspect.listen_path)

      // Load Balancing Algorithm
      cy.get('#react-select-23--value > .Select-input > input')
        .type(oauthJSON.oauth_endpoints.introspect.upstreams.balancing, { force: true })
        .type('{enter}', { force: true })

      // Add Fields
      cy.get('.j-api-form__inner[class$="--overflowed"] .j-api-form__row:nth-of-type(1) .j-icon--type-add')
        .click()

      // Load Balancing Target
      cy.get('input[name="oauth_endpoints.introspect.upstreams.targets[0].target"]')
        .type(oauthJSON.oauth_endpoints.introspect.upstreams.targets[0].target, { force: true })

      // Load Balancing HTTP Methods
      cy.get('#react-select-24--value > .Select-input > input')
        .type('ALL{enter}', { force: true })

      // Save
      cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
        .click()
        .get('.j-confirmation__buttons-group > .j-button--primary')
        .click()
    })
  })

  it('should have added the OAuth server with Token Introspection correctly', () => {
    cy.loginVisit('/oauth/servers')

    cy.fixture('oauth-introspection').then(oauthJSON => {
      // Validate that API has been created correctly
      cy.get('.j-search-bar__input')
        .type(oauthJSON.name)
      cy.get('a[href="/oauth/servers/introspection_auth"] > .j-icon--type-edit')
        .click()

      // Validate URL
      cy.location()
        .its('pathname')
        .should('eq', `/oauth/servers/${oauthJSON.name}`)

      // Validate form fields
      // 1. General
      // OAuth Server Name
      cy.get('input[name="name"]')
        .should('have.value', oauthJSON.name)

      // 2. CORS
      // CORS Toggle
      cy.get('input[name="cors_meta.enabled"][value="true"]')
        .should('have.value', 'true')

      // CORS Domains
      cy.get('#react-select-2--value')
        .contains('*')

      // CORS Methods
      cy.get('#react-select-3--value')
        .contains('ALL')

      // CORS Request Headers
      cy.get('#react-select-4--value')
        .contains('Origin')
      cy.get('#react-select-4--value')
        .contains('Authorization')
      cy.get('#react-select-4--value')
        .contains('Content-Type')

      // CORS Exposed Headers
      cy.get('#react-select-5--value')
        .contains('X-Debug-Token')
      cy.get('#react-select-5--value')
        .contains('X-Debug-Token-Link')

      // 3. Rate Limit
      // Rate Limit Value
      cy.get('input[name="rate_limit.limit.value"]')
        .should('have.value', '240')

      // Rate Limit Unit
      cy.get('#react-select-6--value')
        .contains('Seconds')

      // Rate Limit Toggle
      cy.get('input[name="rate_limit.enabled"][value="true"]')
        .should('have.value', 'true')

      // 4. Token Strategy
      // Strategy
      cy.get('#react-select-7--value')
        .contains(oauthJSON.token_strategy.name)

      // OAuth Header Type
      cy.get('input[name="token_strategy.settings.auth_header_type"]')
        .should('have.value', oauthJSON.token_strategy.settings.auth_header_type)

      // OAuth Header Toggle
      cy.get('input[name="token_strategy.settings.use_auth_header"][value="true"]')
        .should('have.value', 'true')

      // Secrets
      // Secret One
      cy.get('input[name="secrets[0].key"]')
        .should('have.value', Object.keys(oauthJSON.secrets)[0])

      cy.get('input[name="secrets[0].value"]')
        .should('have.value', oauthJSON.secrets[`${Object.keys(oauthJSON.secrets)[0]}`])

      // Secret Two
      cy.get('input[name="secrets[1].key"]')
        .should('have.value', Object.keys(oauthJSON.secrets)[1])

      cy.get('input[name="secrets[1].value"]')
        .should('have.value', oauthJSON.secrets[`${Object.keys(oauthJSON.secrets)[1]}`])

      // OAuth Endpoints
      // Introspect
      // Listen Path
      cy.get('input[name="oauth_endpoints.introspect.listen_path"]')
        .should('have.value', oauthJSON.oauth_endpoints.introspect.listen_path)

      // Load Balancing Algorithm
      cy.get('#react-select-8--value')
        .contains(oauthJSON.oauth_endpoints.introspect.upstreams.balancing)

      // Load Balancing Target
      cy.get('input[name="oauth_endpoints.introspect.upstreams.targets[0].target"]')
        .should('have.value', oauthJSON.oauth_endpoints.introspect.upstreams.targets[0].target)

      // Load Balancing HTTP Methods
      cy.get('#react-select-9--value')
        .contains('ALL')
    })
  })

  it('should be able to add a new OAuth Server using JWT token', () => {
    cy.loginVisit('/oauth/servers/new')

    cy.fixture('oauth-jwt').then(oauthJSON => {
      // 1. General
      // OAuth Server Name
      cy.get('input[name="name"]')
        .type(oauthJSON.name)

      // 2. CORS
      // CORS Toggle
      cy.get('input[name="cors_meta.enabled"][value="true"]')
        .click()

      // CORS Domains
      cy.get('#react-select-2--value > .Select-input > input')
        .type('*{enter}', { force: true })

      // CORS Methods
      cy.get('#react-select-3--value > .Select-input > input')
        .type('All{enter}', { force: true })

      // CORS Request Headers
      cy.get('#react-select-4--value > .Select-input > input')
        .type('Origin{enter}', { force: true })
        .type('Authorization{enter}', { force: true })
        .type('Content-Type{enter}', { force: true })

      // CORS Exposed Headers
      cy.get('#react-select-5--value > .Select-input > input')
        .type('X-Debug-Token{enter}', { force: true })
        .type('X-Debug-Token-Link{enter}', { force: true })

      // 3. Rate Limit
      // Rate Limit Value
      cy.get('input[name="rate_limit.limit.value"]')
        .clear()
        .type(240)

      // Rate Limit Unit
      cy.get('#react-select-6--value > .Select-input')
        .click({ force: true })
        .type('{enter}', { force: true })

      // Rate Limit Toggle
      cy.get('input[name="rate_limit.enabled"][value="true"]')
        .click()

      // 4. Token Strategy
      // Strategy
      cy.get('#react-select-7--value > .Select-input')
        .click({ force: true })
        .type('{enter}', { force: true })

      // JWT Algorithm
      cy.get('input[name="token_strategy.settings[0].alg"]')
        .type(oauthJSON.token_strategy.settings[0].alg)

      // JWT Secret
      cy.get('input[name="token_strategy.settings[0].key"]')
        .type(oauthJSON.token_strategy.settings[0].key)

      // Secrets
      // Add Fields
      cy.get('.j-api-form__inner:not([class$="--overflowed"]) .j-api-form__section:nth-of-type(4) > .j-api-form__row:last-child .j-row .j-icon--type-add')
        .click()
        .click()

      // Secret One
      cy.get('input[name="secrets[0].key"]')
        .type(Object.keys(oauthJSON.secrets)[0])

      cy.get('input[name="secrets[0].value"]')
        .type(oauthJSON.secrets[`${Object.keys(oauthJSON.secrets)[0]}`])

      // Secret Two
      cy.get('input[name="secrets[1].key"]')
        .type(Object.keys(oauthJSON.secrets)[1])

      cy.get('input[name="secrets[1].value"]')
        .type(oauthJSON.secrets[`${Object.keys(oauthJSON.secrets)[1]}`])

      // OAuth Endpoints
      // Authorize
      // Listen Path
      cy.get('input[name="oauth_endpoints.authorize.listen_path"]')
        .type(oauthJSON.oauth_endpoints.authorize.listen_path)

      // Load Balancing Algorithm
      cy.get('#react-select-8--value > .Select-input > input')
        .type(oauthJSON.oauth_endpoints.authorize.upstreams.balancing, { force: true })
        .type('{enter}', { force: true })

      // Add Fields
      cy.get('.j-api-form__inner[class$="--overflowed"] .j-api-form__section:nth-child(1) .j-api-form__row:nth-of-type(1)  .j-icon--type-add')
        .click()

      // Load Balancing Target
      cy.get('input[name="oauth_endpoints.authorize.upstreams.targets[0].target"]')
        .type(oauthJSON.oauth_endpoints.authorize.upstreams.targets[0].target, { force: true })

      // Load Balancing HTTP Methods
      cy.get('#react-select-9--value > .Select-input > input')
        .type('ALL{enter}', { force: true })

      // Token
      // Listen Path
      cy.get('input[name="oauth_endpoints.token.listen_path"]')
        .type(oauthJSON.oauth_endpoints.token.listen_path)

      // Load Balancing Algorithm
      cy.get('#react-select-11--value > .Select-input > input')
        .type(oauthJSON.oauth_endpoints.token.upstreams.balancing, { force: true })
        .type('{enter}', { force: true })

      // Add Fields
      cy.get('.j-api-form__inner[class$="--overflowed"] .j-api-form__section:nth-child(2) .j-api-form__row:nth-of-type(1)  .j-icon--type-add')
        .click()

      // Load Balancing Target
      cy.get('input[name="oauth_endpoints.token.upstreams.targets[0].target"]')
        .type(oauthJSON.oauth_endpoints.token.upstreams.targets[0].target, { force: true })

      // Load Balancing HTTP Methods
      cy.get('#react-select-12--value > .Select-input > input')
        .type('ALL{enter}', { force: true })

      // Revoke
      // Listen Path
      cy.get('input[name="oauth_endpoints.revoke.listen_path"]')
        .type(oauthJSON.oauth_endpoints.revoke.listen_path)

      // Load Balancing Algorithm
      cy.get('#react-select-14--value > .Select-input > input')
        .type(oauthJSON.oauth_endpoints.revoke.upstreams.balancing, { force: true })
        .type('{enter}', { force: true })

      // Add Fields
      cy.get('.j-api-form__inner[class$="--overflowed"] .j-api-form__section:nth-child(3) .j-api-form__row:nth-of-type(1) .j-icon--type-add')
        .click()

      // Load Balancing Target
      cy.get('input[name="oauth_endpoints.revoke.upstreams.targets[0].target"]')
        .type(oauthJSON.oauth_endpoints.revoke.upstreams.targets[0].target, { force: true })

      // Load Balancing HTTP Methods
      cy.get('#react-select-15--value > .Select-input > input')
        .type('ALL{enter}', { force: true })

      // Save
      cy.get('.j-api-form__sticky .j-button.j-button--primary[type="submit"]')
        .click()
        .get('.j-confirmation__buttons-group > .j-button--primary')
        .click()
    })
  })

  it('should have added the OAuth server with JWT token correctly', () => {
    cy.loginVisit('/oauth/servers')

    cy.fixture('oauth-jwt').then(oauthJSON => {
      // Validate that API has been created correctly
      cy.get('.j-search-bar__input')
        .type(oauthJSON.name)
      cy.get('a[href="/oauth/servers/jwt_auth"] > .j-icon--type-edit')
        .click()

      // Validate URL
      cy.location()
        .its('pathname')
        .should('eq', `/oauth/servers/${oauthJSON.name}`)

      // Validate form fields
      // 1. General
      // OAuth Server Name
      cy.get('input[name="name"]')
        .should('have.value', oauthJSON.name)

      // 2. CORS
      // CORS Toggle
      cy.get('input[name="cors_meta.enabled"][value="true"]')
        .should('have.value', 'true')

      // CORS Domains
      cy.get('#react-select-2--value')
        .contains('*')

      // CORS Methods
      cy.get('#react-select-3--value')
        .contains('ALL')

      // CORS Request Headers
      cy.get('#react-select-4--value')
        .contains('Origin')
      cy.get('#react-select-4--value')
        .contains('Authorization')
      cy.get('#react-select-4--value')
        .contains('Content-Type')

      // CORS Exposed Headers
      cy.get('#react-select-5--value')
        .contains('X-Debug-Token')
      cy.get('#react-select-5--value')
        .contains('X-Debug-Token-Link')

      // 3. Rate Limit
      // Rate Limit Value
      cy.get('input[name="rate_limit.limit.value"]')
        .should('have.value', '240')

      // Rate Limit Unit
      cy.get('#react-select-6--value')
        .contains('Seconds')

      // Rate Limit Toggle
      cy.get('input[name="rate_limit.enabled"][value="true"]')
        .should('have.value', 'true')

      // 4. Token Strategy
      // Strategy
      cy.get('#react-select-7--value')
        .contains(oauthJSON.token_strategy.name)

      // Token Algorithm
      cy.get('input[name="token_strategy.settings[0].alg"]')
        .should('have.value', oauthJSON.token_strategy.settings[0].alg)

      // Token Secret
      cy.get('input[name="token_strategy.settings[0].key"]')
        .should('have.value', oauthJSON.token_strategy.settings[0].key)

      // Secrets
      // Secret One
      cy.get('input[name="secrets[0].key"]')
        .should('have.value', Object.keys(oauthJSON.secrets)[0])

      cy.get('input[name="secrets[0].value"]')
        .should('have.value', oauthJSON.secrets[`${Object.keys(oauthJSON.secrets)[0]}`])

      // Secret Two
      cy.get('input[name="secrets[1].key"]')
        .should('have.value', Object.keys(oauthJSON.secrets)[1])

      cy.get('input[name="secrets[1].value"]')
        .should('have.value', oauthJSON.secrets[`${Object.keys(oauthJSON.secrets)[1]}`])

      // OAuth Endpoints
      // Authorize
      // Listen Path
      cy.get('input[name="oauth_endpoints.authorize.listen_path"]')
        .should('have.value', oauthJSON.oauth_endpoints.authorize.listen_path)

      // Load Balancing Algorithm
      cy.get('#react-select-8--value')
        .contains(oauthJSON.oauth_endpoints.authorize.upstreams.balancing)

      // Load Balancing Target
      cy.get('input[name="oauth_endpoints.authorize.upstreams.targets[0].target"]')
        .should('have.value', oauthJSON.oauth_endpoints.authorize.upstreams.targets[0].target)

      // Load Balancing HTTP Methods
      cy.get('#react-select-9--value')
        .contains('ALL')

      // Token
      // Listen Path
      cy.get('input[name="oauth_endpoints.token.listen_path"]')
        .should('have.value', oauthJSON.oauth_endpoints.token.listen_path)

      // Load Balancing Algorithm
      cy.get('#react-select-8--value')
        .contains(oauthJSON.oauth_endpoints.token.upstreams.balancing)

      // Load Balancing Target
      cy.get('input[name="oauth_endpoints.token.upstreams.targets[0].target"]')
        .should('have.value', oauthJSON.oauth_endpoints.token.upstreams.targets[0].target)

      // Load Balancing HTTP Methods
      cy.get('#react-select-9--value')
        .contains('ALL')

      // Revoke
      // Listen Path
      cy.get('input[name="oauth_endpoints.revoke.listen_path"]')
        .should('have.value', oauthJSON.oauth_endpoints.revoke.listen_path)

      // Load Balancing Algorithm
      cy.get('#react-select-8--value')
        .contains(oauthJSON.oauth_endpoints.revoke.upstreams.balancing)

      // Load Balancing Target
      cy.get('input[name="oauth_endpoints.revoke.upstreams.targets[0].target"]')
        .should('have.value', oauthJSON.oauth_endpoints.revoke.upstreams.targets[0].target)

      // Load Balancing HTTP Methods
      cy.get('#react-select-9--value')
        .contains('ALL')

    })
  })
})
