import React from 'react';
import block from '../../../helpers/bem-cn';

import './Footer.css';

const b = block('j-footer');

const Footer = () => (
    <footer className={b}>
        <p className={b('inner')()}>
            <strong>Janus</strong> by <a href="http://hellofresh.com">HelloFresh</a>. The <a href="https://github.com/hellofresh/janus-dashboard" target="_blank" rel="noopener noreferrer">source code</a> is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
    </footer>
);

export default Footer;
