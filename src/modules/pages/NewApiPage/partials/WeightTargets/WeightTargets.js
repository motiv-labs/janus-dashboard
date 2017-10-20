import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';

import block from '../../../../../helpers/bem-cn';

import Row from '../../../../Layout/Row/Row';
import Label from '../../../../labels/Label';
import Input from '../../../../inputs/Input';
import Control from '../../../../buttons/Control/Control';

import AddDoubleFields from '../../../../../components/AddDoubleFields/AddDoubleFields';

const row = block('j-row');

const propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
};

const WeightTargets = ({ name, title }) => {
    const config = [
        {
            type: 'text',
            sufix: 'target',
            placeholder: 'Target',
        },
        {
            type: 'number',
            sufix: 'weight',
            placeholder: 'Weight',
        },
    ];

    return (
        <AddDoubleFields
            name={`${name}`}
            title={title}
            config={config}
        />
    );
};

WeightTargets.propTypes = propTypes;

export default WeightTargets;
