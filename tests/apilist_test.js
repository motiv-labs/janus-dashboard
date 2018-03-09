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

Scenario('Page title', I => {
    within('.j-title', () => {
        I.see('APIs');
    });
});

Scenario('Search field', I => {
    within('input.j-search-bar__input', () => {
        I.see('');
    });
});

Scenario('Create New Api button', I => {
    within('button.j-button.j-button--primary', () => {
        I.see('+ Create New API');
    });
});

Scenario('Healthcheck info block', I => {
    within('.j-healthcheck__incorrect.j-pane', () => {
        I.see('Some services are unvailable. Check it on Health Check list here.')
    });
});

Scenario('Contains all information', I => {
    within('.j-table__head', () => {
        I.see('Api Name');
        I.see('Listen Path');
        I.see('Active');
    });
});

Scenario('Pagination', I => {
    within('.Pagimagic__nav.j-pagination__nav', () => {
        I.see('');
    });
});

Scenario('Preloader', I => {
    within('.j-pages > .j-section.j-section--outer', () => {
        I.dontSee('.bubble-loader.j-preloader');
    });
});

Scenario('Redirection to Create New Api Page', I => {
    I.click('+ Create New API')
    I.redirectToPage(
        '.j-api-form',
        'Create New API',
    );
});
