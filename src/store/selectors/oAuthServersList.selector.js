import { createSelector } from 'reselect';
import R from 'ramda';

const getOAuthServers = state => state.oAuthServersReducer.oAuthServers;
const getSearchQuery = state => state.searchReducer.searchQuery;
const getSortingFilter = state => state.oAuthServersReducer.sortingFilter;
const getAscendFilter = state => state.oAuthServersReducer.sortAscend;

const sortByNameCaseInsensitive = asc => R.sort(
    asc
        ? R.ascend(R.compose(R.toLower, R.prop('name')))
        : R.descend(R.compose(R.toLower, R.prop('name')))
);

const getFilteredOAuthServersList = (oAuthServersList, searchQuery, sortingFilter, sortAscend) => {
    const sortedList = (list, filterName, ascend) => {
        switch (filterName) {
            case 'name': {
                return sortByNameCaseInsensitive(sortAscend)(list);
            }
            default:
                return list;
        }
    };
    const listFilteredAccordingToSearchQuery = list => list.filter(el => {
        const searchIsActive = el.name.toLowerCase().includes(searchQuery.toLowerCase());

        return (searchIsActive) ? el : false;
    });

    return R.compose(listFilteredAccordingToSearchQuery, sortedList)(
        oAuthServersList,
        sortingFilter,
        sortAscend,
    );
};

export const filteredOAuthServersList = createSelector(
    getOAuthServers,
    getSearchQuery,
    getSortingFilter,
    getAscendFilter,
    getFilteredOAuthServersList,
);
