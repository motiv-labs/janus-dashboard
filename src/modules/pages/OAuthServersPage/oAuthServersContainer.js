import { connect } from 'react-redux';

import {
    deleteOAuthServer,
    fetchOAuthServers,
    setOAuthServersAscendingFilter,
    setOAuthServersListCurrentPageIndex,
    setOAuthServersSortingFilter,
} from '../../../store/actions';
import { filteredOAuthServersList } from '../../../store/selectors';

import OAuthServersList from './OAuthServersList';

const mapStateToProps = state => ({
    oAuthServers: filteredOAuthServersList(state),
    currentPageIndex: state.oAuthServersListReducer.currentPageIndex,
    searchQuery: state.searchReducer.searchQuery,
});

export default connect(
    mapStateToProps,
    {
        deleteOAuthServer,
        fetchOAuthServers,
        setAscendingFilter: setOAuthServersAscendingFilter,
        setCurrentPageIndex: setOAuthServersListCurrentPageIndex,
        setSortingFilter: setOAuthServersSortingFilter,
    },
)(OAuthServersList);
