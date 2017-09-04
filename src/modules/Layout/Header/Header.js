import React from 'react';

import block from '../../../helpers/bem-cn';
import Nav from '../Nav/Nav';

import './Header.css';

const b = block('j-header');

const Header = ({ logged }) => {
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
                </div>
            </header>
        );
    }

    return (
        <header className={b}></header>
    );
};

export default Header;
