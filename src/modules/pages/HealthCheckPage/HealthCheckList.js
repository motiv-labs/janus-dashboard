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
const table = block('j-table');

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

    handleShowDetails = name => {
        this.props.fetchHealthCheckItem(name);
    }

    renderRows = list => list.map(item => (
        <div className={bItem()} key={item.name}>
            <div className={bItem('name')}>{item.name}</div>
            <div className={bItem('message')}>{item.description}</div>
            {/*<div className={bItem('details')} onClick={() => this.handleShowDetails(item.name)}>Show Details</div>*/}
            <Link to={`/${item.name}`}>
                <Icon type="edit" />
            </Link>
        </div>
    ));

    renderTable = list => {
        const {
            clearHealthCheckDetails,
            problemToDisplay,
            status,
            statusName,
        } = this.props;

        return (
            <div className={table()}>
                <div className={table('head')}>
                    <div className={table('row')}>
                        <div
                            className={table('th')}
                        >
                            <div>Api Name</div>
                        </div>
                        <div className={table('th')}>Description</div>
                        <div className={table('th')} />
                    </div>
                </div>
                <div className={table('tbody')}>
                    { this.renderRows(list) }
                </div>
            </div>
        );
    }

    render() {
        const {
            currentPageIndex,
            healthcheckList,
            setCurrentPageIndex,
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
            <PaginatedList
                list={healthcheckList}
                itemsPerPage={10}
                currentPageIndex={currentPageIndex}
                changePageIndex={setCurrentPageIndex}
                maximumVisiblePaginators={3}
                renderChildren={this.renderTable}
            />
        );
    }
};

HealthCheckList.propTypes = propTypes;

export default HealthCheckList;
