import React from 'react';
import PropTypes from 'prop-types';

import block from '../../helpers/bem-cn';

import './Icon.css';

const b = block('j-icon');

const propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf([
        'edit',
        'checked',
        'delete',
        'close',
        'copy',
        'correct',
    ]),
};

const Control = ({ className, type }) => (
    <span className={b({ type }).mix(className)} />
);

Control.propTypes = propTypes;

export default Control;
