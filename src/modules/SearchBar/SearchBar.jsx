import React from 'react';
import PropTypes from 'prop-types';

import './SearchBar.css';

const propTypes = {
  discardPagination: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func.isRequired,
};

const defaultProps = {
  value: '',
  placeholder: 'Search...',
};

const SearchBar = ({ discardPagination, placeholder, searchQuery, setSearchQuery }) => {
  return (
    <div className="j-search-bar">
      <input
        className="search-bar__input input"
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={({ target: { value } }) => {
          discardPagination();
          setSearchQuery(value);
        }}
      />
    </div>
  );
};

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
