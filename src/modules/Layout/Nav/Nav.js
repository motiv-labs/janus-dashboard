import React from 'react';
import { NavLink } from 'react-router-dom';

import block from '../../../helpers/bem-cn';
import ROUTES from '../../../configurations/routes.config';

import './Nav.css';

const nav = block('j-nav');

const Nav = () => (
  <div className={nav}>
    <NavLink
      exact
      to={ROUTES.MAIN.path}
      className={nav('item')()}
      activeClassName={nav('item', { active: true })()}
    >
      {ROUTES.MAIN.name}
    </NavLink>
    <NavLink
      to={ROUTES.NEW.path}
      className={nav('item')()}
      activeClassName={nav('item', { active: true })()}
    >
      {ROUTES.NEW.name}
    </NavLink>
    <NavLink
      to={ROUTES.LOGIN.path}
      className={nav('item')()}
      activeClassName={nav('item', { active: true })()}
    >
      {ROUTES.LOGIN.name}
    </NavLink>
  </div>
);

export default Nav;
