import { connect } from 'react-redux';

import {
  checkLoggedStatus,
} from '../../../store/actions';

import LoginForm from './LoginForm';

const mapStateToProps = (state) => {
  return {
    api: state.userSessionReducer.api,
  };
};

export default connect(
  mapStateToProps,
  { checkLoggedStatus },
)(LoginForm);
