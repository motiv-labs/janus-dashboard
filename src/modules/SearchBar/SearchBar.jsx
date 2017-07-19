import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '../UI/icons/SearchIcon';

import '../forms/FormInput/FormInput.css';
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
      <SearchIcon className="j-search-bar__icon" />
      <input
        className="j-input j-search-bar__input"
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
