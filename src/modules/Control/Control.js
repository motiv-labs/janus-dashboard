import React from 'react';

import block from '../../helpers/bem-cn';

import './Control.css';

const b = block('j-control');

const Control = ({ type }) => {
  return (
    <span className={b({ type })}></span>
  );
};

export default Control;
