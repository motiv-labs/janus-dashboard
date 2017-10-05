import React from 'react';

import './Input.css';

const Input = (props) => {
    console.error('PROPS', props);

    const { type, input, placeholder, disabled, meta: { error, touched }, warning } = props;

    return (
        <input
            className={`j-input ${error && touched && ' j-input--error'}`}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            {...input}
        />
    );
};

export default Input;
