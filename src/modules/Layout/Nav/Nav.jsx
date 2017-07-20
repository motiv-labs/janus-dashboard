import React from 'react';

import block from '../../../helpers/bem-cn';

import './Nav.css';

export const navClassName = block('j-nav');

const Nav = ({ children }) => {
  return (
    <nav className={navClassName}>
      { children }
    </nav>
  );
};

export default Nav;
