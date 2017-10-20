import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import OAuthEndpoint from './OAuthEndpoint';

const propTypes = {
    endpoints: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
};

const OAuthEndpoints = ({ endpoints, schema }) => {
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
                        />
                    );
                })
            }
        </div>
    );
};

OAuthEndpoints.propTypes = propTypes;

export default OAuthEndpoints;
