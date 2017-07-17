import { connect } from 'react-redux';

import {
  setSearchQuery,
  discardPagination,
} from '../../store/actions';

import SearchBar from './SearchBar';

const mapStateToProps = state => {
  return {
    searchQuery: state.searchReducer.searchQuery,
  };
};

export default connect(
  mapStateToProps,
  { setSearchQuery, discardPagination },
)(SearchBar);
