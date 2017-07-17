import React from 'react';

import './Subtitle.css';

const Subtitle = ({ children }) => {
  return (
    <h2 className="j-subtitle">{ children }</h2>
  );
};

export default Subtitle;
