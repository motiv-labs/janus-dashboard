import { connect } from 'react-redux';

import {
  fetchApiSchema,
  resetAPI,
  saveAPI,
} from '../../../store/actions';

import NewApiItem from './NewApiItem';

const mapStateToProps = (state) => {
  return {
    api: state.apiReducer.api,
  };
};

export default connect(
  mapStateToProps,
  { fetchApiSchema, resetAPI, saveAPI },
)(NewApiItem);
