import React from 'react';

import './Container.css';

const Container = ({ children }) => {
  return (
    <div className="j-container">
      { children }
    </div>
  );
};

export default Container;
