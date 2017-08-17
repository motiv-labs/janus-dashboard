import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import {
  Link,
} from 'react-router-dom';

import block from '../../../helpers/bem-cn';

import Correct from './Correct';
import Icon from '../../Icon/Icon';
import Pagination from '../../Pagination/Pagination';
import HealthCheckModal from '../../modals/HealthCheckModal/HealthCheckModal';

import './HealthCheckList.css';

const b = block('j-healthcheck');
const bList = block(b('list')());
const bItem = block(b('list-item')());

const propTypes = {
    clearHealthCheckDetails: PropTypes.func.isRequired,
    fetchHealthCheckList: PropTypes.func.isRequired,
    fetchHealthCheckItem: PropTypes.func.isRequired,
    healthcheckList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class HealthCheckList extends PureComponent {
    componentDidMount() {
        this.props.fetchHealthCheckList();
    }

    test = name => {
        this.props.fetchHealthCheckItem(name);
    }

    renderList = () => {
        return (
            <div>Oooops</div>
        );
    }

    renderHealthcheckInfo = status => {
        const {
            clearHealthCheckDetails,
            problemToDisplay,
            healthcheckList
        } = this.props;

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
                    healthcheckList.map(item => {
                        return (
                            <div className={bItem()} key={item.name}>
                                <div className={bItem('name')}>{item.name}</div>
                                <div className={bItem('message')}>{item.message}</div>
                                <div className={bItem('details')} onClick={() => this.test(item.name)}>Show Details</div>
                                <Link to={`/${item.name}`}>
                                    <Icon type="edit" />
                                </Link>
                            </div>
                        );
                    })
                }

                <HealthCheckModal
                    className={b('modal')()}
                    isOpen={!R.isEmpty(problemToDisplay)}
                    closeModal={clearHealthCheckDetails}
                    message={problemToDisplay.status}
                    statusText={problemToDisplay.name}
                    problems={problemToDisplay.list}
                />
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
        // console.error(R.isEmpty(this.props.problemToDisplay), this.props);
        return this.renderHealthcheckInfo(this.props.status);
    }
};

HealthCheckList.propTypes = propTypes;

export default HealthCheckList;
