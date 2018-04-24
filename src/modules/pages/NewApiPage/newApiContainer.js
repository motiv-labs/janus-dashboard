import { connect } from 'react-redux'

import {
  fetchEndpoint,
  fetchEndpointSchema,
  resetEndpoint,
  refreshEndpoints,
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
    fetchEndpoint,
    fetchEndpointSchema,
    resetEndpoint,
    excludePlugin,
    refreshEndpoints,
    selectPlugin,
    willClone,
    confirmAction
  }
)(NewApiItem)
