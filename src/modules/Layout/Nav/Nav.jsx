import React from 'react';

import './Nav.css';

const Nav = ({ children }) => {
  return (
    <nav className="j-nav">
      { children }
    </nav>
  );
};

export default Nav;
