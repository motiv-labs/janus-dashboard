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
    fetchHealthCheckList: PropTypes.func.isRequired,
    fetchHealthCheckItem: PropTypes.func.isRequired,
    healthcheckList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class HealthCheckList extends PureComponent {
    componentDidMount() {
        this.props.fetchHealthCheckList();
    }

    test = name => {
        console.log(name);
        this.props.fetchHealthCheckItem(name);
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
                                <div className={bItem('name')}>{item.name}</div>
                                <div className={bItem('message')}>{item.message}</div>
                                <div className={bItem('details')} onClick={() => this.test(item.name)}>Show Details</div>
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
        // console.error(this.props);
        return this.renderHealthcheckInfo(this.props.status);
    }
};

HealthCheckList.propTypes = propTypes;

export default HealthCheckList;
