import React from 'react';
import PropTypes from 'prop-types';

import block from '../../../helpers/bem-cn';

import './Row.css';

const row = block('j-row');
const column = block('j-col');

const propTypes = {
    children: PropTypes.node.isRequired,
    col: PropTypes.bool,
    className: PropTypes.string,
};

const wrapChild = (child, cn) => (
    <div
        className={cn('item')}
    >
        {child}
    </div>
);

const wrapChildren = (children, cn) => children.map((item, index) => (
    <div
        className={cn('item')}
        key={index}
    >
        {item}
    </div>
));

const Row = ({ children, className, col, alignCenter }) => {
    const cn = col ? column : row;

    return (
        <div className={alignCenter ? cn({ 'centered': true }).mix(className) : cn.mix(className)}>
            { children.length > 1 ? wrapChildren(children, cn) : wrapChild(children, cn) }
        </div>
    );
};

Row.propTypes = propTypes;

export default Row;
