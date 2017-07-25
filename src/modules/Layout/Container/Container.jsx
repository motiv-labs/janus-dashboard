import React from 'react';
import PropTypes from 'prop-types';

import './Container.css';

const propTypes = {
  className: PropTypes.string,
};

const Container = ({ children, className }) => {
  const classNames = className ? `j-container ${className}` : 'j-container';

  return (
    <div className={classNames}>
      { children }
    </div>
  );
};

Container.propTypes = propTypes;

export default Container;
