import React from 'react';
import block from '../../../helpers/bem-cn';

import './Footer.css';

const b = block('j-footer');

const Footer = () => (
    <footer className={b}>
        <p>
            <strong>Janus</strong> by <a href="http://hellofresh.com">HelloFresh</a>. The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
    </footer>
);

export default Footer;
