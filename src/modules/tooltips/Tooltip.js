import React from 'react';
import PropTypes from 'prop-types';

import './Tooltip.css';

const propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.node,
};

const Tooltip = props => (
  <div className="j-tooltip">
    {props.icon}
    <span className="j-tooltip__text">
      {props.children}
    </span>
  </div>
);

Tooltip.propTypes = propTypes;

export default Tooltip;
