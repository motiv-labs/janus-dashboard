import React from 'react';
import PropTypes from 'prop-types';

import AddDoubleFields from '../../../../../components/AddDoubleFields/AddDoubleFields';

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
