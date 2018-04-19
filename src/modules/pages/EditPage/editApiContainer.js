import { connect } from 'react-redux'

import {
  excludePlugin,
  fillSelected,
  selectPlugin,
  fetchEndpointSchema,
  fetchEndpoint,
  refreshEndpoints,
  resetEndpoint,
  confirmAction
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
    fillSelected,
    selectPlugin,
    fetchEndpoint,
    refreshEndpoints,
    resetEndpoint,
    confirmAction
  }
)(ApiItem)
