import React from 'react';
import PropTypes from 'prop-types';

import './Hint.css';

const propTypes = {
    children: PropTypes.string.isRequired,
};

const Hint = ({ children }) => (
    <div className="j-hint">{ children }</div>
);

Hint.propTypes = propTypes;

export default Hint;
