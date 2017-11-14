import { connect } from 'react-redux';

import {
    clearHealthCheckDetails,
    fetchHealthCheckList,
    fetchHealthCheckItem,
    setAscendingFilter,
    setCurrentPageIndex,
    setSortingFilter,
} from '../../../store/actions';
import { filteredHealthcheckList } from '../../../store/selectors';

import HealthCheckList from './HealthCheckList';

const mapStateToProps = state => ({
    healthcheckList: filteredHealthcheckList(state),
    status: state.healthcheckReducer.status,
    statusName: state.healthcheckReducer.statusName,
    currentPageIndex: state.paginationReducer.currentPageIndex,
    searchQuery: state.searchReducer.searchQuery,
});

export default connect(
    mapStateToProps,
    {
        clearHealthCheckDetails,
        fetchHealthCheckList,
        fetchHealthCheckItem,
        setAscendingFilter,
        setCurrentPageIndex,
        setSortingFilter,
    },
)(HealthCheckList);
