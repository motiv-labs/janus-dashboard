import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';

class HealthCheckList extends PureComponent {
    componentDidMount() {
        this.props.fetchHealthCheck();
    }

    render() {
        return (
            <div>HealthCheckList</div>
        );
    }
};

export default HealthCheckList;
