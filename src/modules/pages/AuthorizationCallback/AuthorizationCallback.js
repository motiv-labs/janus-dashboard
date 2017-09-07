import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
    GET_TOKEN,
} from '../../../store/actions';

class AuthorizationCallback extends PureComponent {
    componentDidMount() {
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
        // console.error('ACUNA MATATA', window.location)

        // const location = window.location.href;
        const code = getParameterByName('code');
        const state = getParameterByName('state');

        this.props.GET_TOKEN(code, state);
    }

    render() {
        return <div>Foo</div>;
    }
}
// export default AuthorizationCallback;

// const mapStateToProps = state => ({
//     apiList: filteredApiList(state),
//     currentPageIndex: state.apiListReducer.currentPageIndex,
// });

export default connect(
    null, // mapStateToProps
    {
        GET_TOKEN
    }, // mapDispatchToProps
)(AuthorizationCallback);
