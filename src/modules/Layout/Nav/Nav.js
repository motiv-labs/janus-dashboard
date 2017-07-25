import React from 'react';
import { NavLink } from 'react-router-dom';

import block from '../../../helpers/bem-cn';
import ROUTES from '../../../configurations/routes.config';

import './Nav.css';

const nav = block('j-nav');

const Nav = () => {
  return (
    <div className={nav}>
      <NavLink
        exact
        to={ROUTES.MAIN}
        className={nav('item')()}
        activeClassName={nav('item', { active: true })()}
      >
        API Definitions
      </NavLink>
      <NavLink
        to={ROUTES.NEW}
        className={nav('item')()}
        activeClassName={nav('item', { active: true })()}
      >
        New API
      </NavLink>
      <NavLink
        to={ROUTES.LOGIN}
        className={nav('item')()}
        activeClassName={nav('item', { active: true })()}
      >
        Login Page
      </NavLink>
    </div>
  );
};

export default Nav;
