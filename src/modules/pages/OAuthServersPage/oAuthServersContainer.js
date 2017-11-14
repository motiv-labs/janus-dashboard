import { connect } from 'react-redux';

import {
    deleteOAuthServer,
    fetchOAuthServers,
    refreshOAuthServers,
    setOAuthServersAscendingFilter,
    setCurrentPageIndex,
    setOAuthServersSortingFilter,
} from '../../../store/actions';
import { filteredOAuthServersList } from '../../../store/selectors';

import OAuthServersList from './OAuthServersList';

const mapStateToProps = state => ({
    oAuthServers: filteredOAuthServersList(state),
    currentPageIndex: state.paginationReducer.currentPageIndex,
    searchQuery: state.searchReducer.searchQuery,
});

export default connect(
    mapStateToProps,
    {
        deleteOAuthServer,
        fetchOAuthServers,
        refreshOAuthServers,
        setAscendingFilter: setOAuthServersAscendingFilter,
        setCurrentPageIndex,
        setSortingFilter: setOAuthServersSortingFilter,
    },
)(OAuthServersList);
