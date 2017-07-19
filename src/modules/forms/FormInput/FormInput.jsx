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

const renderField = (component, type, name, normalize, parse, disabled) => {
  const props = {
    name,
    component,
    type,
    normalize,
    parse,
    disabled,
  };
  return (
    <Field className="j-input" {...props} />
  );
};

const FormInput = ({ label, attachTo, component, type, tooltip, normalize, parse, disabled }) => {
  return (
    <FormField>
      <FormLabel htmlFor={attachTo} text={label} tooltip={tooltip} />
      {renderField(component, type, attachTo, normalize, parse, disabled)}
    </FormField>
  );
};

FormInput.propTypes = propTypes;

export default FormInput;
