import React from 'react';

import './Header.css';

const Header = ({ children }) => {
  return (
    <header className="j-header hero is-primary is-bold">
      <div className="j-header-body">
        <div className="container">
          <h1 className="title">Janus</h1>
          <h2 className="subtitle">An API Gateway.</h2>
        </div>
      </div>
      <div className="j-header-foot">
        <div className="container">
          <nav className="j-header-tabs">
            <ul>
              { children }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
