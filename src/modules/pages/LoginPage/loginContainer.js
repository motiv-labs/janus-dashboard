import { connect } from 'react-redux';

import {
    checkLoggedStatus,
    loginUser,
} from '../../../store/actions';

// import LoginForm from './LoginForm';
import FormWrapper from './FormWrapper';

const mapStateToProps = state => ({
    api: state.userSessionReducer.api,
});

export default connect(
    mapStateToProps,
    { checkLoggedStatus, loginUser },
)(FormWrapper);
// )(LoginForm);
