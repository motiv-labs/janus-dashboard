const assert = require('assert');

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTczMjUxMDAsImlhdCI6MTUxNzMyMTUwMCwiaXNfYWRtaW4iOmZhbHNlLCJzdWIiOiJpdmFuenVza28ifQ.YtwCmFHDFPY45JOcigFOw5-0F_afiC-YPAq6WwSCddg';
// const ACCESS_TOKEN = '';

Feature('Api List Page');

Before(I => {
    // Replace with actual github login flow once it's available
    I.amOnPage('/');
    I.executeScript(token => {
        window.localStorage.access_token = token;
    }, ACCESS_TOKEN);
    I.amOnPage('/');
    I.waitForElement('.j-table');
});

Scenario('Page title', I => {
    within('.j-title', () => {
        I.see('APIs');
    });
});

Scenario('Contains all information', I => {
    within('.j-table__head', () => {
        I.see('Api Name');
        I.see('Listen Path');
        I.see('Active');
    });
});
