// Overwrite visit to always insert `access_token`
Cypress.Commands.add('loginVisit', (url, options) => {
  const token = Cypress.env('ACCESS_TOKEN')
  const admin_url = 'http://localhost:8081'

  // Visit has to be done before inserting access_token
  //   because localStorage is isolated by website.
  cy.visit('/')
    .then(win => localStorage.setItem('access_token', token))
    .then(win => localStorage.setItem('admin_url', admin_url))

  return cy.visit(url, options)
})
