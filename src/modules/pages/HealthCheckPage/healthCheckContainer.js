import { connect } from 'react-redux';

import {
    fetchHealthCheck,
} from '../../../store/actions';

import HealthCheckList from './HealthCheckList';

const mapStateToProps = state => ({
    status: state.healthcheckReducer.status,
});

export default connect(
    mapStateToProps,
    { fetchHealthCheck },
)(HealthCheckList);
