import React from 'react';
import PropTypes from 'prop-types';

import block from '../../helpers/bem-cn';
import Icon from '../Icon/Icon';

import './Control.css';

const b = block('j-control');

const propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

const Control = ({ className, icon, onClick }) => (
    <button className={b.mix(className)} type="button" onClick={onClick}>
        <Icon className={b('icon')()} type={icon} />
    </button>
);

Control.propTypes = propTypes;

export default Control;
