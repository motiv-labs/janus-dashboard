import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import FormField from './FormField';
import FormLabel from './FormLabel';

const propTypes = {
  attachTo: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  normalize: PropTypes.func,
};

const styles = {
  disabled: {
    backgroundColor: 'whitesmoke',
    borderColor: 'whitesmoke',
    boxShadow: 'none',
    color: '#7a7a7a',
  },
  text: {
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    alignItems: 'center',
    border: '1px solid transparent',
    borderRadius: '3px',
    display: 'inline-flex',
    fontSize: '1rem',
    height: '36px',
    justifyContent: 'flex-start',
    lineHeight: '1.5',
    paddingBottom: 'calc(0.375em - 1px)',
    paddingLeft: 'calc(0.625em - 1px)',
    paddingRight: 'calc(0.625em - 1px)',
    paddingTop: 'calc(0.375em - 1px)',
    position: 'relative',
    verticalAlign: 'top',
    backgroundColor: '#fff',
    borderColor: '#dbdbdb',
    color: '#363636',
    boxShadow: 'inset 0 1px 2px rgba(10, 10, 10, 0.1)',
    maxWidth: '100%',
    width: '100%',
    boxSizing: 'border-box',
  },
  checkbox: {
    height: '36px',
    margin: 0,
    padding: 0,
  },
};

const renderField = (component, type, name, normalize, parse, disabled) => {
  const style = disabled ? {...styles[type], ...styles.disabled} : styles[type];
  const props = {
    style,
    name,
    component,
    type,
    normalize,
    parse,
    disabled,
  };
  return (
    <Field {...props} />
  );
};

const FormInput = (props) => {
  const { attachTo, component, type, normalize, parse, disabled } = props;

  return (
    <FormField>
      <FormLabel htmlFor={attachTo} text={props.label} />
      {renderField(component, type, attachTo, normalize, parse, disabled)}
    </FormField>
  );
};

FormInput.propTypes = propTypes;

export default FormInput;
