const ACCESS_TOKEN = ''

Feature('Api List Page');

Before(I => {
    // Replace with actual github login flow once it's available
    I.amOnPage('/');
    I.executeScript(token => {
        window.localStorage.access_token = token;
    }, ACCESS_TOKEN);
    I.amOnPage('/');
    I.seeElement('.j-preloader');
    I.waitForElement('.j-table');
    I.waitForElement('.j-healthcheck__incorrect.j-pane');
});

Scenario('All elements are present', I => {
    within('.j-title', () => {
        I.see('APIs');
    });
    within('input.j-search-bar__input', () => {
        I.see('');
    });
    within('button.j-button.j-button--primary', () => {
        I.see('+ Create New API');
    });
    within('.j-healthcheck__incorrect.j-pane', () => {
        I.see('Some services are unvailable. Check it on Health Check list here.')
    });
    within('.j-table__head', () => {
        I.see('Api Name');
        I.see('Listen Path');
        I.see('Active');
    });
    within('.Pagimagic__nav.j-pagination__nav', () => {
        I.see('');
    });
    within('.j-pages > .j-section.j-section--outer', () => {
        I.dontSee('.bubble-loader.j-preloader');
    });
});

Scenario('Redirection to Create New Api Page', I => {
    I.click('+ Create New API');
    I.redirectToPage(
        '.j-api-form',
        'Create New API',
    );
});
