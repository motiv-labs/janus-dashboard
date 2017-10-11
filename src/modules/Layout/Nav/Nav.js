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
            exact
            to={ROUTES.HEALTHCHECK.path}
            className={nav('item')()}
            activeClassName={nav('item', { active: true })()}
        >
            {ROUTES.HEALTHCHECK.name}
        </NavLink>
        <NavLink
            exact
            to={ROUTES.OAUTH_SERVERS.path}
            className={nav('item')()}
            activeClassName={nav('item', { active: true })()}
        >
            {ROUTES.OAUTH_SERVERS.name}
        </NavLink>
    </div>
);

export default Nav;
