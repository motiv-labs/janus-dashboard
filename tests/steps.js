module.exports = function() {
    return actor({
        redirectToPage(element, expectation) {
            this.waitForElement(element);
            this.see(expectation);
        },
    });
};
