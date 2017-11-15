import React from 'react';
import PropTypes from 'prop-types';

import block from '../../helpers/bem-cn';

import './Hint.css';

const b = block('j-hint');

const propTypes = {
    children: PropTypes.string.isRequired,
    title: PropTypes.bool,
};

const Hint = ({ children, title }) => (
    <div className={b({ title })()}>{ children }</div>
);

Hint.propTypes = propTypes;

export default Hint;
