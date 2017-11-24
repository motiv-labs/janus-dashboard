import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import OAuthEndpoint from './OAuthEndpoint';

const propTypes = {
    activeTab: PropTypes.bool.isRequired,
    category: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    editing: PropTypes.bool,
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
    activeTab,
}) => {
    const checkOnNil = item => !R.isNil(item);
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
            activeTab={activeTab}
        />
    );
    const renderEndpoints = endpointsList
        .filter(excludeIrrelevant)
        .map(renderOAuthEndpoint);

    return (
        <div>
            {
                renderEndpoints
            }
        </div>
    );
};

OAuthEndpoints.propTypes = propTypes;

export default OAuthEndpoints;
