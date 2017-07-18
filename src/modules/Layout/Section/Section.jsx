import React from 'react';

const styles = {
  paddingTop: '10px',
  paddingBottom: '10px',
};

const Section = ({ children }) => {
  return (
    <div style={styles}>
      {children}
    </div>
  );
};

export default Section;