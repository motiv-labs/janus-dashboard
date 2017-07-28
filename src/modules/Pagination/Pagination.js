import React from 'react';
import PropTypes from 'prop-types';
import Pagimagic from 'react-pagimagic';

import './Pagination.css';

const propTypes = {
    changePageIndex: PropTypes.func.isRequired,
    currentPageIndex: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    maximumVisiblePaginators: PropTypes.number.isRequired,
    renderChildren: PropTypes.func.isRequired,
};

const Pagination = ({
    list,
    currentPageIndex,
    changePageIndex,
    itemsPerPage,
    maximumVisiblePaginators,
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

Pagination.propTypes = propTypes;

export default Pagination;
