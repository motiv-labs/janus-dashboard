import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Link } from 'react-router-dom';

import block from '../../../helpers/bem-cn';

import Correct from './Correct';
import Icon from '../../Icon/Icon';
import PaginatedList from '../../PaginatedList/PaginatedList';
import HealthCheckModal from '../../modals/HealthCheckModal/HealthCheckModal';

import './HealthCheckList.css';

const b = block('j-healthcheck');
const bList = block(b('list')());
const bItem = block(b('list-item')());

const propTypes = {
    clearHealthCheckDetails: PropTypes.func.isRequired,
    currentPageIndex: PropTypes.number.isRequired,
    fetchHealthCheckList: PropTypes.func.isRequired,
    fetchHealthCheckItem: PropTypes.func.isRequired,
    healthcheckList: PropTypes.arrayOf(PropTypes.object).isRequired,
    setCurrentPageIndex: PropTypes.func.isRequired,
};

class HealthCheckList extends PureComponent {
    componentDidMount() {
        this.props.fetchHealthCheckList();
    }

    handleShowDetailes = name => {
        this.props.fetchHealthCheckItem(name);
    }

    renderHealthcheckInfo = list => {
        const {
            clearHealthCheckDetails,
            problemToDisplay,
            status,
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
                    list.map(item => {
                        return (
                            <div className={bItem()} key={item.name}>
                                <div className={bItem('name')}>{item.name}</div>
                                <div className={bItem('message')}>{item.message}</div>
                                <div className={bItem('details')} onClick={() => this.handleShowDetailes(item.name)}>Show Details</div>
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
    }

    render() {
        return (
            <PaginatedList
                list={this.props.healthcheckList}
                itemsPerPage={3}
                currentPageIndex={this.props.currentPageIndex}
                changePageIndex={this.props.setCurrentPageIndex}
                maximumVisiblePaginators={3}
                renderChildren={this.renderHealthcheckInfo}
            />
        );
    }
};

HealthCheckList.propTypes = propTypes;

export default HealthCheckList;
