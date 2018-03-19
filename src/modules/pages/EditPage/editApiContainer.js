import { connect } from 'react-redux'

import {
  deleteEndpoint,
  excludePlugin,
  fillSelected,
  selectPlugin,
  fetchEndpointSchema,
  fetchEndpoint,
  refreshEndpoints,
  resetEndpoint,
  saveEndpoint,
  updateEndpoint
} from '../../../store/actions'

import ApiItem from './ApiItem'

const mapStateToProps = state => ({
  api: state.apiReducer.api,
  apiSchema: state.apiReducer.apiSchema,
  response: state.apiReducer.response,
  selectedPlugins: state.apiReducer.selectedPlugins,
  isAdmin: state.userSessionReducer.isAdmin
})

export default connect(
  mapStateToProps,
  {
    deleteEndpoint,
    excludePlugin,
    fetchEndpointSchema,
    fillSelected,
    selectPlugin,
    saveEndpoint,
    fetchEndpoint,
    refreshEndpoints,
    resetEndpoint,
    updateEndpoint
  }
)(ApiItem)
