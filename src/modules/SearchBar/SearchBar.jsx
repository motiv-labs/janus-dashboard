import React from 'react';
import PropTypes from 'prop-types';

import block from '../../helpers/bem-cn';

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

const b = block('j-search-bar');

const SearchBar = ({ discardPagination, placeholder, searchQuery, setSearchQuery }) => {
  return (
    <div className={b}>
      <span className={b('icon')}></span>
      <input
        className={b('input').mix('j-input')}
        type="text"
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
