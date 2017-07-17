import React from 'react';
import JanusLogo from '../../UI/icons/JanusLogo';

import './Nav.css';

const Nav = () => {
  return (
    <nav className="j-nav">
      <div className="j-nav-left">
        <a href="/" className="j-nav-item">
          <JanusLogo />
        </a>
      </div>
      <div className="j-nav-center">
        <a href="https://github.com/hellofresh/janus" target="_blank" rel="noopener noreferrer" className="j-nav-item source-code-icon">
          <span className="icon">&#60; &#62;</span>
        </a>
      </div>
      <div className="j-nav-right"></div>
    </nav>
  );
};

export default Nav;
