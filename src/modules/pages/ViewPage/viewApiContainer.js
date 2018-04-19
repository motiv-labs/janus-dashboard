import { connect } from 'react-redux'

import {
  excludePlugin,
  selectPlugin,
  fetchEndpointSchema,
  fetchEndpoint,
  refreshEndpoints,
  resetEndpoint
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
    excludePlugin,
    fetchEndpointSchema,
    selectPlugin,
    fetchEndpoint,
    refreshEndpoints,
    resetEndpoint
  }
)(ApiItem)
