import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
    GET_TOKEN,
    FOO
} from '../../../store/actions';

// class AuthorizationCallback extends PureComponent {
const AuthorizationCallback = props => {
    /*
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
    */


    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }


    const extractCode = function(hash) {
        console.log(window);
        console.warn(window.location.search);
        var match = getParameterByName('code');
        console.error('>>>>>>Code::: ', match);
        return !!match && match[1];
    };

    props.FOO(extractCode(document.location.hash));

};
// export default AuthorizationCallback;

// const mapStateToProps = state => ({
//     apiList: filteredApiList(state),
//     currentPageIndex: state.apiListReducer.currentPageIndex,
// });

export default connect(
    null, // mapStateToProps
    {
        GET_TOKEN,
        FOO
    }, // mapDispatchToProps
)(AuthorizationCallback);
