import { connect } from 'react-redux';

import {
  deleteAPI,
  fetchAPI,
  refreshAPIs,
  resetAPI,
  updateAPI,
} from '../../../store/actions';

import ApiItem from './ApiItem';

const mapStateToProps = (state) => {
  return {
    api: state.apiReducer.api,
  };
};

export default connect(
  mapStateToProps,
  { deleteAPI, fetchAPI, refreshAPIs, resetAPI, updateAPI },
)(ApiItem);
