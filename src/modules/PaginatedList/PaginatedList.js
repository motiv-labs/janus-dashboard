import React from 'react';
import PropTypes from 'prop-types';
import Pagimagic from 'react-pagimagic';

import './PaginatedList.css';

const propTypes = {
    changePageIndex: PropTypes.func.isRequired,
    currentPageIndex: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    maximumVisiblePaginators: PropTypes.number.isRequired,
    renderChildren: PropTypes.func.isRequired,
};

const PaginatedList = ({
    list,
    currentPageIndex,
    changePageIndex,
    itemsPerPage = 10,
    maximumVisiblePaginators = 5,
    renderChildren,
}) => (
    <Pagimagic
        list={list}
        itemsPerPage={itemsPerPage}
        currentPageIndex={currentPageIndex}
        changePageIndex={changePageIndex}
        className="j-pagination"
        maximumVisiblePaginators={maximumVisiblePaginators}
        renderChildren={renderChildren}
        arrow
    />
);

PaginatedList.propTypes = propTypes;

export default PaginatedList;
