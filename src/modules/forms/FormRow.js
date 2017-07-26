import React from 'react';

const comboShot = one => two => three => ({
  ...one,
  ...two,
  ...three,
});

const horizontal = pr => (pr ? { justifyContent: 'center' } : {});
const vertical = pr => (pr ? { alignItems: 'center' } : {});

const basic = {
  padding: '6px 0',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

const FormRow = ({ children, alignX, alignY }) => (
  <div style={comboShot(basic)(horizontal(alignX))(vertical(alignY))}>
    { children }
  </div>
);

export default FormRow;
