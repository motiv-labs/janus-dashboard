import React from 'react';

import './Input.css';

const Input = (props) => {
    const { type, input, placeholder, disabled } = props;
    console.error('VALUE::::: ', props);

    return (
        <input
            className="j-input"
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            {...input}
        />
    );
};

export default Input;
