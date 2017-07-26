import { createSelector } from 'reselect';

const getApiList = state => state.apiListReducer.apiList;
const getSearchQuery = state => state.searchReducer.searchQuery;

const getFilteredApiList = (apiList, searchQuery) => apiList.filter((el) => {
  if (
	    el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
	    el.proxy.listen_path.toLowerCase().includes(searchQuery.toLowerCase()) ||
	    el.proxy.upstream_url.toLowerCase().includes(searchQuery.toLowerCase())
  ) {
    return el;
  }
});

export const filteredApiList = createSelector(
  getApiList,
  getSearchQuery,
  getFilteredApiList,
);
