import React from 'react';
import PropTypes from 'prop-types';

import block from '../../../helpers/bem-cn';

import './Section.css';

const b = block('j-section');

const propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    outer: PropTypes.bool,
    small: PropTypes.bool,
};

const Section = ({ children, className, outer, small }) => (
    <div className={b({ small, outer }).mix(className)}>
        {children}
    </div>
);

Section.propTypes = propTypes;

export default Section;
