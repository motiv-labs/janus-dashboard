// Overwrite visit to always insert `access_token`
Cypress.Commands.add('loginVisit', (url, options) => {
  const token = Cypress.env('ACCESS_TOKEN')

  // Visit has to be done before inserting access_token
  //   because localStorage is isolated by website.
  cy.visit('/')
    .then(win => localStorage.setItem('access_token', token))

  return cy.visit(url, options)
})
