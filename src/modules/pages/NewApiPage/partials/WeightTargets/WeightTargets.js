import React from 'react';
import PropTypes from 'prop-types';

import AddDoubleFields from '../../../../../components/AddDoubleFields/AddDoubleFields';

const propTypes = {
    isValidate: PropTypes.string,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
};

const WeightTargets = ({ isValidate, name, title }) => {
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
            isValidate={isValidate}
        />
    );
};

WeightTargets.propTypes = propTypes;

export default WeightTargets;
