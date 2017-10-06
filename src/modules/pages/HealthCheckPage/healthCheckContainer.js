import { connect } from 'react-redux';

import {
    clearHealthCheckDetails,
    fetchHealthCheckList,
    fetchHealthCheckItem,
    setCurrentPageIndex,
} from '../../../store/actions';
import { filteredHealthcheckList } from '../../../store/selectors';

import HealthCheckList from './HealthCheckList';

const mapStateToProps = state => ({
    healthcheckList: filteredHealthcheckList(state),
    status: state.healthcheckReducer.status,
    statusName: state.healthcheckReducer.statusName,
    // problemToDisplay: state.healthcheckReducer.problemEndpoint,
    currentPageIndex: state.healthcheckReducer.currentPageIndex,
});

export default connect(
    mapStateToProps,
    { clearHealthCheckDetails, fetchHealthCheckList, fetchHealthCheckItem, setCurrentPageIndex },
)(HealthCheckList);
