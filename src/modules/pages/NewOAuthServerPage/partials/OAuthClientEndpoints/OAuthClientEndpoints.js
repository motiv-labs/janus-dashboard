import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import OAuthClientEndpoint from './OAuthClientEndpoint';

const propTypes = {
    category: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    endpoints: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
};

const OAuthClientEndpoints = ({ category, change, endpoints, initialValues, schema, activeTab }) => {
    const checkOnNil = item => !R.isNil(item);
    const endpointsList = R.toPairs(R.filter(checkOnNil, endpoints));

    return (
        <div>
            {
                endpointsList.map(item => {
                    return (
                        <OAuthClientEndpoint
                            key={item[0]}
                            name={item[0]}
                            schema={schema}
                            change={change}
                            category={category}
                            initialValues={initialValues}
                            activeTab={activeTab}
                        />
                    );
                })
            }
        </div>
    );
};

OAuthClientEndpoints.propTypes = propTypes;

export default OAuthClientEndpoints;
