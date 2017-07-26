import React from 'react';

import './Table.css';

const Table = ({ children, className }) => {
  return (
    <table className={className}>
      { children }
    </table>
  );
};

export default Table;
