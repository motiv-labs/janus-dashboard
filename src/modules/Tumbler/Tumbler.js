import React from 'react';
import { Field } from 'redux-form';

import './Tumbler.css';

const Tumbler = ({ name }) => {
    return (
        <Field
            name={name}
            className="j-tumbler"
            component="input"
            type="checkbox"
            normalize={v => !!v}
        />
    );
};

export default Tumbler;
