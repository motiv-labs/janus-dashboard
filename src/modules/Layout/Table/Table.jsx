import React from 'react';

const Table = ({ children }) => {
  return (
    <table className="j-table">
      { children }
    </table>
  );
};

export default Table;
