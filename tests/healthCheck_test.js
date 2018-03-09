const ACCESS_TOKEN = ''

Feature('Health Check Problems Page');

Before(I => {
    // Replace with actual github login flow once it's available
    I.amOnPage('/');
    I.executeScript(token => {
        window.localStorage.access_token = token;
    }, ACCESS_TOKEN);
    I.amOnPage('/healthcheck');
    I.seeElement('.j-preloader');
    I.waitForElement('.j-table');
});

Scenario('All elements are present', I => {
    within('.j-title', () => {
        I.see('Health Check Probledms');
    });
    within('input.j-search-bar__input', () => {
        I.see('');
    });
    within('.j-table__head', () => {
        I.see('Api Name');
        I.see('Description');
    });
    within('.Pagimagic__nav.j-pagination__nav', () => {
        I.see('');
    });
    within('.j-pages > .j-section.j-section--outer', () => {
        I.dontSee('.bubble-loader.j-preloader');
    });
});
