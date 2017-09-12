import { connect } from 'react-redux';

import {
    authorizeThroughGithub,
} from '../../../store/actions';

import FormWrapper from './LoginForm';

const mapStateToProps = state => ({
    errorMsg: state.userSessionReducer.errorMsg,
    isFetching: state.requestReducer.isFetching,
});

export default connect(
    mapStateToProps,
    { authorizeThroughGithub },
)(FormWrapper);
