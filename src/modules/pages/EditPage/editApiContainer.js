import { connect } from 'react-redux';

import {
  fetchAPI,
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
  { fetchAPI, resetAPI, updateAPI },
)(ApiItem);
