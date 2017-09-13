import React from 'react';
import PropTypes from 'prop-types';

import block from '../../../helpers/bem-cn';
import Nav from '../Nav/Nav';

import './Header.css';

const b = block('j-header');

const propTypes = {
    user: PropTypes.string.isRequired,
};

const Header = ({ user }) => {
    if (user) {
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
                            <div className={b('user')}>
                                <div className={b('user-name')}>
                                    {user}
                                    <div className={b('user-menu')} onClick="">Logout</div>
                                </div>
                            </div>
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
