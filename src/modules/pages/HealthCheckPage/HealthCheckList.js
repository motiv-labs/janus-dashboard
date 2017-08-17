import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';

import block from '../../../helpers/bem-cn';

import Correct from './Correct';
import Pagination from '../../Pagination/Pagination';

import './HealthCheckList.css';

const b = block('j-healthcheck');
const bList = block(b('list')());
const bItem = block(b('list-item')());

const propTypes = {
    fetchHealthCheck: PropTypes.func.isRequired,
};

class HealthCheckList extends PureComponent {
    componentDidMount() {
        this.props.fetchHealthCheck();
    }

    renderList = () => {
        return (
            <div>Oooops</div>
        );
    }

    renderHealthcheckInfo = status => {
        if (status) {
            return (
                <div className={b('pane').mix('j-pane')}>
                    <Correct className={b('correct')()} />
                </div>
            );
        }

        return (
            <div className={bList()}>
                {
                    this.props.healthcheckList.map(item => {
                        return (
                            <div className={bItem()}>
                                <div className={bItem('name')}>{item.service}</div>
                                <div className={bItem('status')}>Partialy Available</div>
                            </div>
                        );
                    })
                }
            </div>
        );
        // return (
        //     <Pagination
        //         list={this.props.apiList}
        //         itemsPerPage={3}
        //         currentPageIndex={this.props.currentPageIndex}
        //         changePageIndex={this.props.setCurrentPageIndex}
        //         maximumVisiblePaginators={3}
        //         renderChildren={this.renderTable}
        //     />
        // );
    }

    render() {
        return this.renderHealthcheckInfo(this.props.status);
    }
};

HealthCheckList.propTypes = propTypes;

export default HealthCheckList;
