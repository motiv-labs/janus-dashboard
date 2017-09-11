import React from 'react';
import PropTypes from 'prop-types';

import block from '../../helpers/bem-cn';

import './Icon.css';

const b = block('j-icon');

const propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf([
        'add', // green plus
        'checked',
        'close',
        'copy', // green files
        'copy-white', // white files
        'correct',
        'delete', // red bucket
        'delete-white', // white bucket
        'edit', // green pencil
        'github',
        'remove', // red minus
    ]).isRequired,
};

const Control = ({ className, type }) => (
    <span className={b({ type }).mix(className)} />
);

Control.propTypes = propTypes;

export default Control;
