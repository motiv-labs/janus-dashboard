import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getJWTtoken } from '../../../store/actions';

// class AuthorizationCallback extends PureComponent {
const AuthorizationCallback = props => {
    props.getJWTtoken(document.location.hash);
};
// export default AuthorizationCallback;

// const mapStateToProps = state => ({
//     apiList: filteredApiList(state),
//     currentPageIndex: state.apiListReducer.currentPageIndex,
// });

export default connect(
    null, // mapStateToProps
    { getJWTtoken },
)(AuthorizationCallback);
