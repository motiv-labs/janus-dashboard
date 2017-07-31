import React from 'react';

import './Input.css';

const Input = (props) => {
    const { type, input } = props;

    return (
        <input
            className="j-input"
            type={type}
            {...input}
        />
    );
};

export default Input;
