import React from 'react';
import PropTypes from 'prop-types';

import block from '../../../helpers/bem-cn';

import './Section.css';

const b = block('j-section');

const propTypes = {
    children: PropTypes.node.isRequired,
    small: PropTypes.bool,
};

const Section = ({ children, small }) => (
    <div className={b({ small })}>
        {children}
    </div>
);

Section.propTypes = propTypes;

export default Section;
