import React from 'react';
import PropTypes from 'prop-types';

import block from '../../helpers/bem-cn';

import './Icon.css';

export const b = block('j-icon');

const propTypes = {
    ariaLabel: PropTypes.string,
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
        'successful-white', // white success symbol
    ]).isRequired,
};

const Icon = ({ ariaLabel, className, type }) => (
    <span className={b({ type }).mix(className).mix(ariaLabel && 'j-tooltiped')} aria-label={ariaLabel}/>
);

Icon.propTypes = propTypes;

export default Icon;
