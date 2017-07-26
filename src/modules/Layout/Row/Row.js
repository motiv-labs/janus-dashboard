import React from 'react';

import block from '../../../helpers/bem-cn';

import './Row.css';

const b = block('j-row');

const wrapChildren = children => children.map((item, index) => (
  <div
    className={b('item')}
    key={index}
  >
    {item}
  </div>
));

const Row = ({ children }) => (
  <div className={b}>
    {wrapChildren(children)}
  </div>
);

export default Row;
