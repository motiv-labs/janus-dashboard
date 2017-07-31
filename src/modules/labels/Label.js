import React from 'react';
import PropTypes from 'prop-types';

import './Label.css';

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string,
    ]).isRequired,
};

const Label = ({ children }) => (
    <div className="j-label">
        { children }
    </div>
);

Label.propTypes = propTypes;

export default Label;
