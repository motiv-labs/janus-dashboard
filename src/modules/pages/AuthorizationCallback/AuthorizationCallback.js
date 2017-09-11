import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { GET_JOHNNY } from '../../../store/actions';

// class AuthorizationCallback extends PureComponent {
const AuthorizationCallback = props => {
    props.GET_JOHNNY(document.location.hash);
};
// export default AuthorizationCallback;

// const mapStateToProps = state => ({
//     apiList: filteredApiList(state),
//     currentPageIndex: state.apiListReducer.currentPageIndex,
// });

export default connect(
    null, // mapStateToProps
    { GET_JOHNNY }, // mapDispatchToProps
)(AuthorizationCallback);
