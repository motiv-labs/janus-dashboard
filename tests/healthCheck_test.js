const assert = require('assert');

const ACCESS_TOKEN = '';

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

Scenario('Page title', I => {
    within('.j-title', () => {
        I.see('Health Check Problems');
    });
});

Scenario('Search field', I => {
    within('input.j-search-bar__input', () => {
        I.see('');
    });
});

Scenario('Contains all information', I => {
    within('.j-table__head', () => {
        I.see('Api Name');
        I.see('Description');
    });
});

Scenario('Pagination', I => {
    within('.Pagimagic__nav.j-pagination__nav', () => {
        I.see('');
    });
});

Scenario('No Preloader', I => {
    within('.j-pages > .j-section.j-section--outer', () => {
        I.dontSee('.bubble-loader.j-preloader');
    });
});
