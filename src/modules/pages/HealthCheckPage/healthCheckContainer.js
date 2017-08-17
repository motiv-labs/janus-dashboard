import { connect } from 'react-redux';

import {
    fetchHealthCheckList,
    fetchHealthCheckItem,
    setCurrentPageIndex,
} from '../../../store/actions';
import { filteredHealthcheckList } from '../../../store/selectors';

import HealthCheckList from './HealthCheckList';

const mapStateToProps = state => ({
    healthcheckList: filteredHealthcheckList(state),
    status: state.healthcheckReducer.status,
    currentPageIndex: state.healthcheckReducer.currentPageIndex,
});

export default connect(
    mapStateToProps,
    { fetchHealthCheckList, fetchHealthCheckItem, setCurrentPageIndex },
)(HealthCheckList);
