import React, { PureComponent } from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'

import transformFormValues from '../../../helpers/transformFormValues'
import isAnyEmpty from '../../../helpers/isAnyEmpty'

import EndpointForm from '../../forms/EndpointForm/EndpointForm'
import Preloader from '../../../components/Preloader/Preloader'

const propTypes = {
  api: PropTypes.object.isRequired,
  excludePlugin: PropTypes.func.isRequired,
  fetchEndpointSchema: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  selectPlugin: PropTypes.func.isRequired,
  fetchEndpoint: PropTypes.func.isRequired,
  refreshEndpoints: PropTypes.func.isRequired,
  resetEndpoint: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

class ApiItem extends PureComponent {
  componentDidMount () {
    const endpointName = this.props.location.pathname.split('/preview/')[1]

    this.props.resetEndpoint()
    this.props.fetchEndpointSchema()
    this.props.fetchEndpoint(endpointName)
  }

  render () {
    if (isAnyEmpty([
      this.props.api,
      this.props.apiSchema
    ])) return <Preloader />

    const api = this.props.api
    const apiPlugins = api.plugins
    const defaultPlugins = this.props.apiSchema.plugins
    const updatedPlugins = defaultPlugins.map(item => {
      const res = apiPlugins.filter(pl => pl.name === item.name)

      return res.length > 0 ? res[0] : item
    })
    const lens = R.lensPath(['plugins'])
    // substitude the plugin.config.limit
    const updatedApi = R.set(lens, updatedPlugins, api)

    return (
      <EndpointForm
        api={this.props.api}
        apiSchema={this.props.apiSchema}
        disabled
        editing
        initialValues={transformFormValues(updatedApi)}
        isAdmin={this.props.isAdmin}
        selectPlugin={this.props.selectPlugin}
        selectedPlugins={this.props.selectedPlugins}
        previewPage
      />
    )
  }
}

ApiItem.propTypes = propTypes

export default ApiItem
