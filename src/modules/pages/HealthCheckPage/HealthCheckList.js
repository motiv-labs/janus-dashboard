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

    renderHealthcheckInfo = status => {
        if (status) {
            return <Correct className={b('correct')()} />;
        }

        return <div>Ooops...</div>;
    }

    render() {
        return (
            <div className={b('pane').mix('j-pane')}>
                { this.renderHealthcheckInfo(this.props.status) }
            </div>
        );
    }
};

export default HealthCheckList;
