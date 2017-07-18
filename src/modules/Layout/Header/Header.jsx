import React from 'react';

import Container from '../Container/Container';
import JanusLogo from '../../UI/icons/JanusLogo';
import Nav from '../Nav/Nav';

import './Header.css';

const Header = ({ children }) => {
  return (
    <header className="j-header">
      <div className="j-header__col j-header__left">
        <JanusLogo />
      </div>
      <div className="j-hidder__col j-header__middle">
        <Container>
          <Nav>
            {children}
          </Nav>
        </Container>
      </div>
      <div className="j-header__col j-header__right">
        Here will be info about user 
      </div>
    </header>
  );
};

export default Header;
