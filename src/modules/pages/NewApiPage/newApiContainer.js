import { connect } from 'react-redux';

import {
  fetchEndpointSchema,
  resetEndpoint,
  saveEndpoint,
  willClone,
} from '../../../store/actions';

import NewApiItem from './NewApiItem';

const mapStateToProps = state => ({
  api: state.apiReducer.api,
});

export default connect(
  mapStateToProps,
  { fetchEndpointSchema, resetEndpoint, saveEndpoint, willClone },
)(NewApiItem);
