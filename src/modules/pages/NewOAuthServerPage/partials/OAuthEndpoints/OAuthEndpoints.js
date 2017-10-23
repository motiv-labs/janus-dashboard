import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import OAuthEndpoint from './OAuthEndpoint';

const propTypes = {
    category: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    endpoints: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
};

const OAuthEndpoints = ({ category, change, endpoints, initialValues, schema }) => {
    const endpointsList = R.toPairs(endpoints);

    return (
        <div>
            {
                endpointsList.map(item => {
                    return (
                        <OAuthEndpoint
                            key={item[0]}
                            name={item[0]}
                            endpoint={item[1]}
                            schema={schema}
                            change={change}
                            category={category}
                            initialValues={initialValues}
                        />
                    );
                })
            }
        </div>
    );
};

OAuthEndpoints.propTypes = propTypes;

export default OAuthEndpoints;
