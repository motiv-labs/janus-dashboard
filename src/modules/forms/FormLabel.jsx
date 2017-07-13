import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  attachTo: PropTypes.string,
  text: PropTypes.string.isRequired,
};

const styles = {
  label: {
    color: '#363636',
    display: 'block',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '24px',
    // marginBottom: '0.5em',
  },
};

const FormLabel = (props) => {
  const { attachTo, text } = props;
  return (
    <label style={styles.label} htmlFor={attachTo}>{text}</label>
  );
};

FormLabel.propTypes = propTypes;

export default FormLabel;
