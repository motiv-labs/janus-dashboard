import React from 'react';
import PropTypes from 'prop-types';

import block from '../../helpers/bem-cn';
import './Button.css';

const propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
};

const b = block('j-button');

const Button = (props) => {
  return (
    <button
      className={b({primary: true})}
      type={props.type}
    >
      {props.label}
    </button>
  );
};

Button.propTypes = propTypes;

export default Button;
