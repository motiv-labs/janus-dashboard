import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import OAuthClientEndpoint from './OAuthClientEndpoint';

const propTypes = {
    endpoints: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
};

const OAuthClientEndpoints = ({ endpoints, schema }) => {
    const endpointsList = R.toPairs(endpoints);

    return (
        <div>
            {
                endpointsList.map(item => {
                    return (
                        <OAuthClientEndpoint
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

OAuthClientEndpoints.propTypes = propTypes;

export default OAuthClientEndpoints;
