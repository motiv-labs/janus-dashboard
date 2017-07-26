import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    block: {
        padding: '0 6px',
        flexShrink: 0,
    },
};

const propTypes = {
    children: PropTypes.node.isRequired,
};

const FormField = ({ children }) => (
  <div style={styles.block}>
    { children }
  </div>
);

FormField.propTypes = propTypes;

export default FormField;
