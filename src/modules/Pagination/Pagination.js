import React from 'react';
import Pagimagic from 'react-pagimagic';

import './Pagination.css';

// const arrow = () => {};
const Pagination = ({ 
  list,
  currentPageIndex,
  changePageIndex,
  itemsPerPage,
  maximumVisiblePaginators,
  renderChildren,
}) => {
  return (
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
};

export default Pagination;
