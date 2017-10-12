import { connect } from 'react-redux';

import {
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
});

export default connect(
    mapStateToProps,
    {
        fetchOAuthServers,
        setAscendingFilter: setOAuthServersAscendingFilter,
        setCurrentPageIndex: setOAuthServersListCurrentPageIndex,
        setSortingFilter: setOAuthServersSortingFilter,
    },
)(OAuthServersList);
