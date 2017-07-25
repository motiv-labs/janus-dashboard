import React from 'react';

import block from '../../../helpers/bem-cn';
import Container from '../Container/Container';
import Nav from '../Nav/Nav';

import './Header.css';

const b = block('j-header');

const Header = ({ children }) => {
  return (
    <header className={b}>
      <div className={b('col', { 'left': true })}>
        <span className={b('logo')}></span>
      </div>
      <Container className={b('col', { 'middle': true })}>
        <Nav />
      </Container>
      <div className={b('col', { 'right': true })}>
        Lorem ipsum 
      </div>
    </header>
  );
};

export default Header;
