import { createSelector } from 'reselect';

const getHealthcheckList = state => state.healthcheckReducer.healthcheckList;
const getSearchQuery = state => state.searchReducer.searchQuery;

const getFilteredHealthcheckList = (list, searchQuery) => list.filter((el) => {
    if (
        el.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
        return el;
    }

    return false;
});

export const filteredHealthcheckList = createSelector(
    getHealthcheckList,
    getSearchQuery,
    getFilteredHealthcheckList,
);
