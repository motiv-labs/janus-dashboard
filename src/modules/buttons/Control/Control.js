import React from 'react';
import PropTypes from 'prop-types';

import block from '../../../helpers/bem-cn';
import Icon from '../../Icon/Icon';

import './Control.css';

const b = block('j-control');

const propTypes = {
    icon: Icon.propTypes.type,
    onClick: PropTypes.func.isRequired,
};

const Control = ({ className, icon, onClick }) => (
    <button className={b()} type="button" onClick={onClick}>
        <Icon className={b('icon')()} type={icon} />
    </button>
);

Control.propTypes = propTypes;

export default Control;
