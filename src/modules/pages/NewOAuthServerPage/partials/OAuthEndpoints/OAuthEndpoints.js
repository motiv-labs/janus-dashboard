import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import OAuthEndpoint from './OAuthEndpoint';

const propTypes = {
    category: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    endpoints: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
};

const OAuthEndpoints = ({
    category,
    change,
    editing,
    endpoints,
    initialValues,
    schema,
    strategyName,
}) => {
    console.error('ed', endpoints);

    const checkOnNil = item => !R.isNil(item);
    const t = item => console.warn('item >>> ', item);
    const T = R.filter(t, endpoints);
    console.log(T);
    const endpointsList = R.toPairs(R.filter(checkOnNil, endpoints));
    const excludeIrrelevant = item =>
        strategyName === 'introspection' ?
            item[0] === 'introspect' :
            item[0] !== 'introspect';
    const renderOAuthEndpoint = item => (
        <OAuthEndpoint
            key={item[0]}
            name={item[0]}
            editing={editing}
            endpoint={item[1]}
            schema={schema}
            change={change}
            category={category}
            initialValues={initialValues}
        />
    );

    return (
        <div>
            {
                endpointsList
                    .filter(excludeIrrelevant)
                    .map(renderOAuthEndpoint)
            }
        </div>
    );
};

OAuthEndpoints.propTypes = propTypes;

export default OAuthEndpoints;
