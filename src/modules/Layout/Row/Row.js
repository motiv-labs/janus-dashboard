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

const wrapChild = (child, cn, className) => (
    <div
        className={cn('item').mix(className)}
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

const Row = ({ children, className, col, alignCenter, fullwidth }) => {
    const cn = col ? column : row;

    if (children.length > 1) {
        return (
            <div className={alignCenter ? cn({ 'centered': true })({ fullwidth }).mix(className) : cn({ fullwidth }).mix(className)}>
                { wrapChildren(children, cn) }
            </div>
        );
    }
    return wrapChild(children, cn, className);
};

Row.propTypes = propTypes;

export default Row;
