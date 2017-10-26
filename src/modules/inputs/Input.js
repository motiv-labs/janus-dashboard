import React from 'react';

import './Input.css';

const Input = props => {
    const { type, input, placeholder, disabled, meta, warning } = props;

    return (
        <input
            className={`j-input${(!disabled && meta.error && meta.touched) ? ' j-input--error' : ''}`}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            {...input}
        />
    );
};

export default Input;
