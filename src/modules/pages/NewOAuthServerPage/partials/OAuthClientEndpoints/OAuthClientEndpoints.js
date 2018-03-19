import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import OAuthClientEndpoint from './OAuthClientEndpoint'

const propTypes = {
  category: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  initialValues: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired
}

const OAuthClientEndpoints = ({ category, change, editing, initialValues, schema }) => {
  const endpointsList = R.toPairs(schema.oauth_client_endpoints)

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
              editing={editing}
              initialValues={initialValues}
            />
          )
        })
      }
    </div>
  )
}

OAuthClientEndpoints.propTypes = propTypes

export default OAuthClientEndpoints
