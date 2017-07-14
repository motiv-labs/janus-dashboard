import React from 'react';

const styles = {
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 1000,
  padding: '50px',
  borderRadius: '5px',
  backgroundColor: 'rebeccapurple',
};

const APIRespondModal = (props) => {
  console.log('PROPS:::', props);
  
  return props.isOpen ? 
    (
      <div style={styles}>
        SHOW
      </div>
    ) :
    (
      <div style={styles}>
        No Error so far
      </div>
    );
};

export default APIRespondModal;
