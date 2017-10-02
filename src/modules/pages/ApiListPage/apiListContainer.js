import { connect } from 'react-redux';

import {
    deleteEndpoint,
    fetchEndpoints,
    refreshEndpoints,
    setCurrentPageIndex,
    setSortingFilter,
    setAscendingFilter,
} from '../../../store/actions';
import { filteredApiList } from '../../../store/selectors';

import ApiList from './ApiList';

const mapStateToProps = state => ({
    apiList: filteredApiList(state),
    currentPageIndex: state.apiListReducer.currentPageIndex,
});

export default connect(
    mapStateToProps,
    {
        deleteEndpoint,
        fetchEndpoints,
        refreshEndpoints,
        setCurrentPageIndex,
        setSortingFilter,
        setAscendingFilter,
    },
)(ApiList);
