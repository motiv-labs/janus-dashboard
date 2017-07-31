import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const propTypes = {
    placeholder: PropTypes.string.isRequired,
};

const Input = (props) => {
    // console.log(props)
    const { type, meta, input } = props;

    return (
        <input
            className="j-input"
            type={type}
            {...input}
        />
    );
};

export default Input;
