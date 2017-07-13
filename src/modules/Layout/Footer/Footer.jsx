import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="j-footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <strong>Janus Dashboard</strong> by <a href="http://hellofresh.com">HelloFresh</a>. The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          </p>
          <p>
            <a href="https://github.com/hellofresh/janus-dashboard" target="_blank" rel="noopener noreferrer" className="j-nav-item source-code-icon">
              <span className="icon">&#60; &#62;</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
