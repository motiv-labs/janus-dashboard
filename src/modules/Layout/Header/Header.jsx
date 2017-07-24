import React from 'react';

import block from '../../../helpers/bem-cn';
import Container from '../Container/Container';
import JanusLogo from '../../UI/icons/JanusLogo';

import './Header.css';

const b = block('j-header');

const Header = ({ children }) => {
  return (
    <header className={b}>
      <div className="j-header__col j-header__left">
        <JanusLogo />
      </div>
      <div className="j-hidder__col j-header__middle">
        <Container>
          <div className="j-header__nav">
            {children}
          </div>
        </Container>
      </div>
      <div className="j-header__col j-header__right">
        Here will be info about user 
      </div>
    </header>
  );
};

export default Header;
