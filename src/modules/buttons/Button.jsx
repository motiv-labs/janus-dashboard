import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
};

const Button = (props) => {
  return (
    <button
      className="j-button j-button--primary"
      type={props.type}
    >
      {props.label}
    </button>
  );
};

Button.propTypes = propTypes;

export default Button;
