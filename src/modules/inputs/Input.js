import React from 'react';

import './Input.css';

const Input = (props) => {
    const { type, input, placeholder } = props;

    return (
        <input
            className="j-input"
            type={type}
            placeholder={placeholder}
            {...input}
        />
    );
};

export default Input;
