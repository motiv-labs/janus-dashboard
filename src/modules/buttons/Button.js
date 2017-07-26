import React from 'react';
import PropTypes from 'prop-types';

import block from '../../helpers/bem-cn';
import './Button.css';

const propTypes = {
    mod: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

const b = block('j-button');

const addMod = mod => (mod ? { [mod]: !!mod } : {});

const Button = ({ mod, type, onClick, children }) => (
  <button
    className={b(addMod(mod))}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = propTypes;

export default Button;
