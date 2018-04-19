import { connect } from 'react-redux'

import {
  deleteEndpoint,
  fetchEndpoint,
  fetchEndpointSchema,
  resetEndpoint,
  refreshEndpoints,
  saveEndpoint,
  excludePlugin,
  selectPlugin,
  willClone,
  confirmAction
} from '../../../store/actions'

import NewApiItem from './NewApiItem'

const mapStateToProps = state => ({
  api: state.apiReducer.api,
  apiSchema: state.apiReducer.apiSchema,
  selectedPlugins: state.apiReducer.selectedPlugins
})

export default connect(
  mapStateToProps,
  {
    deleteEndpoint,
    fetchEndpoint,
    fetchEndpointSchema,
    resetEndpoint,
    saveEndpoint,
    excludePlugin,
    refreshEndpoints,
    selectPlugin,
    willClone,
    confirmAction
  }
)(NewApiItem)
