import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';

import block from '../../helpers/bem-cn';

import './Tumbler.css';

const b = block('j-tumbler');

const propTypes = {
    name: PropTypes.string.isRequired,
};

const Tumbler = ({ name }) => {
    return (
        <div className={b()}>
            <Field
                name={name}
                className={b('checkbox')()}
                component="input"
                type="checkbox"
                normalize={v => !!v}
            />
            <div className={b('icon')()}></div>
        </div>
    );
};

Tumbler.propTypes = propTypes;

export default Tumbler;
