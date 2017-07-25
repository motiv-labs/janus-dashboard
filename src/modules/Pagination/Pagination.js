import React from 'react';
import Pagimagic from 'react-pagimagic';

import './Pagination.css';

const Pagination = ({ 
  list,
  currentPageIndex,
  changePageIndex,
  itemsPerPage,
  maximumVisiblePaginators,
  renderChildren,
  // className
}) => {
  return (
    <Pagimagic
      list={list}
      itemsPerPage={itemsPerPage}
      currentPageIndex={currentPageIndex}
      changePageIndex={changePageIndex}
      maximumVisiblePaginators={maximumVisiblePaginators}
      renderChildren={renderChildren}
      useDefaultStyles
    />
  );
};

export default Pagimagic;
