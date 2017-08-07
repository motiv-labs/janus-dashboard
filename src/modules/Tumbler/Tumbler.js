import React from 'react';
import { Field } from 'redux-form';

import block from '../../helpers/bem-cn';

import './Tumbler.css';

const b = block('j-tumbler');

const Tumbler = ({ name }) => {
    return (
        <div className={b()}>
            <Field
                name={name}
                className={b('checkbox')}
                component="input"
                type="checkbox"
                normalize={v => !!v}
            />
            <div className={b('icon')}></div>
        </div>
    );
};

export default Tumbler;
