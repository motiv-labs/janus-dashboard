import React from 'react';

const Td = ({ children, className }) => {
  return (
    <td className={className}>
      <div className={`${className}-inner`}>
        { children }
      </div>
    </td>
  );
};

export default Td;
