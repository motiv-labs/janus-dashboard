import React from 'react';

const Td = ({ children, className }) => {
  return (
    <td className={className}>
      { children }
    </td>
  );
};

export default Td;
