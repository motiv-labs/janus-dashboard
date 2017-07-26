import React from 'react';
import PropTypes from 'prop-types';

import block from '../../helpers/bem-cn';

import './Icon.css';

const b = block('j-control');

const propTypes = {
  type: PropTypes.oneOf([
    'edit',
    'checked',
    'delete',
    'copy',
  ]),
};

const Control = ({ type }) => {
  return (
    <span className={b({ type })}></span>
  );
};

Control.propTypes = propTypes;

export default Control;
