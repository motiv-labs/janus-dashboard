import { connect } from 'react-redux';

import {
    fetchHealthCheck,
} from '../../../store/actions';

import HealthCheckList from './HealthCheckList';

// const mapStateToProps = state => ({
//     api: state.apiReducer.api,
// });

export default connect(
    // mapStateToProps,
    null,
    { fetchHealthCheck },
)(HealthCheckList);
