'use strict';

class GenericHelper extends Helper {
    async hover(el) {
        const page = this.helpers['Puppeteer'].page;

        await page.hover(el);
    }
}

module.exports = GenericHelper;
