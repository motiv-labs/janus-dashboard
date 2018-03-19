const ACCESS_TOKEN = ''

Feature('OAuth Servers List Page')

Before(I => {
  // Replace with actual github login flow once it's available
  I.amOnPage('/')
  I.executeScript(token => {
    window.localStorage.access_token = token
  }, ACCESS_TOKEN)
  I.amOnPage('/oauth/servers')
  I.seeElement('.j-preloader')
  I.waitForElement('.j-table')
})

Scenario('All elements are present', I => {
  within('.j-title', () => {
    I.see('OAuth Servers')
  })
  within('input.j-search-bar__input', () => {
    I.see('')
  })
  within('button.j-button.j-button--primary', () => {
    I.see('+ Create New OAuth Server')
  })
  within('.j-table__head', () => {
    I.see('OAuth Server Name')
  })
  within('.Pagimagic__nav.j-pagination__nav', () => {
    I.see('')
  })
  within('.j-pages > .j-section.j-section--outer', () => {
    I.dontSee('.bubble-loader.j-preloader')
  })
})

Scenario('Redirection to Create New Api Page', I => {
  I.click('+ Create New OAuth Server')
  I.redirectToPage(
    '.j-api-form',
    'Create New OAuth Server'
  )
})
