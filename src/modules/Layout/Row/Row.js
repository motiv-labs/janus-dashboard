import React from 'react';
import PropTypes from 'prop-types';

import block from '../../../helpers/bem-cn';

import './Row.css';

const b = block('j-row');

const propTypes = {
    children: PropTypes.node.isRequired,
};

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

Row.propTypes = propTypes;

export default Row;
