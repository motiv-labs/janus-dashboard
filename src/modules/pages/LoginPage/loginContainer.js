import { connect } from 'react-redux';

import {
    checkLoggedStatus,
    authorizeThroughGithub,
} from '../../../store/actions';

import FormWrapper from './LoginForm';

const mapStateToProps = state => ({
    api: state.userSessionReducer.api,
    errorMsg: state.userSessionReducer.errorMsg,
    isFetching: state.requestReducer.isFetching,
});

export default connect(
    mapStateToProps,
    { checkLoggedStatus, authorizeThroughGithub },
)(FormWrapper);
