import {
  SEARCH_QUERY,
} from '../constants';

export const setSearchQuery = query/* : string */ => ({
    type: SEARCH_QUERY,
    payload: query,
});
