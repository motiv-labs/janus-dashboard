import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { GET_JOHNNY } from '../../../store/actions';

// class AuthorizationCallback extends PureComponent {
const AuthorizationCallback = props => {
    const getParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    const extractParameter = (hash, parameter, url) => getParameterByName(parameter);
    // console.error('============', extractParameter(document.location.hash, 'code'))

    props.GET_JOHNNY(extractParameter(document.location.hash, 'code'));

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
