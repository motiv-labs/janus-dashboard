import React from 'react';
import PropTypes from 'prop-types';

import block from '../../helpers/bem-cn';

import './Icon.css';

const b = block('j-icon');

const propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf([
        'edit', // green pencil
        'checked',
        'delete', // red bucket
        'copy',
        'add', // green plus
        'remove', // red minus
    ]).isRequired,
};

const Control = ({ className, type }) => (
    <span className={b({ type }).mix(className)} />
);

Control.propTypes = propTypes;

export default Control;
