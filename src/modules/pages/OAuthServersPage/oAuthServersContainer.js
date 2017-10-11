import { connect } from 'react-redux';

import {
//     deleteEndpoint,
    fetchOAuthServers,
//     refreshEndpoints,
    setAscendingFilter,
    setCurrentPageIndex,
    setSortingFilter,
} from '../../../store/actions';
import { filteredOAuthServersList } from '../../../store/selectors';

import OAuthServersList from './OAuthServersList';

const mapStateToProps = state => ({
    // oAuthServers: state.oAuthServersReducer.oAuthServers,
    oAuthServers: filteredOAuthServersList(state),
    currentPageIndex: state.oAuthServersReducer.currentPageIndex,
});

export default connect(
    mapStateToProps,
    // {
    //     deleteEndpoint,
    //     fetchEndpoints,
    //     refreshEndpoints,
    // },
    {
        fetchOAuthServers,
        setAscendingFilter,
        setCurrentPageIndex,
        setSortingFilter,
    },
)(OAuthServersList);
