import React from 'react';
import PropTypes from 'prop-types';

import block from '../../../helpers/bem-cn';
import Nav from '../Nav/Nav';

import './Header.css';

const b = block('j-header');

const propTypes = {
    logged: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
};

const Header = ({ logged, user }) => {
    if (logged) {
        return (
            <header className={b}>
                <div className={b('col', { left: true })}>
                    <span className={b('logo')} />
                </div>
                <div className={b('col', { middle: true })}>
                    <Nav />
                </div>
                <div className={b('col', { right: true })}>
                    {
                        user &&
                            <span>
                                {user}
                            </span>
                    }
                </div>
            </header>
        );
    }

    return (
        <header className={b}></header>
    );
};

Header.propTypes = propTypes;

export default Header;
