import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../tooltips/Tooltip';

const propTypes = {
  attachTo: PropTypes.string,
  text: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
};

const styles = {
  label: {
    position: 'relative',
    color: '#363636',
    // display: 'block',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '24px',
    // marginBottom: '0.5em',
  },
  tooltip: {
    position: 'relative',
    color: '#f00',
  },
};

const FormLabel = (props) => {
  const { attachTo, text, tooltip } = props;
  
  return (
    <label style={styles.label} htmlFor={attachTo}>
      {text} {tooltip && <Tooltip icon="?">{tooltip}</Tooltip>}
    </label>
  );
};

FormLabel.propTypes = propTypes;

export default FormLabel;
