import React from 'react';

import block from '../../../helpers/bem-cn';

import './Row.css';

const b = block('j-row');

const wrapChildren = (children) => {
  return children.map((item, index) => {
    return <div className={b('item')}>{item}</div>
  });
};

const Row = ({ children }) => {
  return (
    <div className={b}>
      {wrapChildren(children)}
    </div>
  );
};

export default Row;
