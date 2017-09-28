import { createSelector } from 'reselect';
import R from 'ramda';

const getApiList = state => state.apiListReducer.apiList;
const getSearchQuery = state => state.searchReducer.searchQuery;
const getSortingFilter = state => state.apiListReducer.sortingFilter;
const getAscendFilter = state => state.apiListReducer.sortAscend;

const sortByNameCaseInsensitive = asc => R.sort(
    asc
        ? R.ascend(R.compose(R.toLower, R.prop('name')))
        : R.descend(R.compose(R.toLower, R.prop('name')))
);
const sortByActive = asc => R.sort(
    asc
        ? R.ascend(R.prop('active'))
        : R.descend(R.prop('active'))
);

const getFilteredApiList = (apiList, searchQuery, sortingFilter, sortAscend) => {
    const sortedList = (list, filterName, ascend) => {
        if (filterName === 'name') {
            return sortByNameCaseInsensitive(sortAscend)(list);
        } else if (filterName === 'active') {
            return sortByActive(sortAscend)(list);
        }
        return list;
    };

    return sortedList(apiList, sortingFilter).filter((el) => {
        if (
            el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            el.proxy.listen_path.toLowerCase().includes(searchQuery.toLowerCase()) ||
            el.proxy.upstream_url.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return el;
        }

        return false;
    });
};

export const filteredApiList = createSelector(
    getApiList,
    getSearchQuery,
    getSortingFilter,
    getAscendFilter,
    getFilteredApiList,
);
