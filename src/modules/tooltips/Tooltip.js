import React from 'react';

import './Tooltip.css';

const Tooltip = props => (
  <div className="j-tooltip">
    {props.icon}
    <span className="j-tooltip__text">
      {props.children}
    </span>
  </div>
);

export default Tooltip;
