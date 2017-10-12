import { connect } from 'react-redux';

import {
    fetchOAuthServers,
    setAscendingFilter,
    setOAuthServersListCurrentPageIndex,
    setSortingFilter,
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
        setAscendingFilter,
        setCurrentPageIndex: setOAuthServersListCurrentPageIndex,
        setSortingFilter,
    },
)(OAuthServersList);
