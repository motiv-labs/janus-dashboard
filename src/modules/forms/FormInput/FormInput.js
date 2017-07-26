import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import FormField from '../FormField';
import FormLabel from '../FormLabel';

import './FormInput.css';

const propTypes = {
    attachTo: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    normalize: PropTypes.func,
    tooltip: PropTypes.string,
};

const FormInput = (props) => {
    const {
    attachTo,
    label,
    tooltip,
    ...others,
  } = props;
    return (
    <FormField>
      <FormLabel htmlFor={attachTo} text={label} tooltip={tooltip} />
      <Field {...others} name={attachTo} />
    </FormField>
  );
};

FormInput.propTypes = propTypes;

export default FormInput;
