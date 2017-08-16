import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';

import block from '../../../helpers/bem-cn';

import Correct from './Correct';

import './HealthCheckList.css';

const b = block('j-healthcheck');

class HealthCheckList extends PureComponent {
    componentDidMount() {
        this.props.fetchHealthCheck();
    }

    render() {
        return (
            <div className={b('pane').mix('j-pane')}>
                <Correct className={b('correct')()} />
            </div>
        );
    }
};

export default HealthCheckList;
