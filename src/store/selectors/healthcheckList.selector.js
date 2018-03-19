import { createSelector } from 'reselect'
import R from 'ramda'

const getHealthcheckList = state => state.healthcheckReducer.healthcheckList
const getSearchQuery = state => state.searchReducer.searchQuery
const getSortingFilter = state => state.healthcheckReducer.sortingFilter
const getAscendFilter = state => state.healthcheckReducer.sortAscend

const sortByNameCaseInsensitive = asc => R.sort(
  asc
    ? R.ascend(R.compose(R.toLower, R.prop('name')))
    : R.descend(R.compose(R.toLower, R.prop('name')))
)

const getFilteredHealthcheckList = (list, searchQuery, sortingFilter, sortAscend) => {
  const sortedList = (list, filterName, ascend) => {
    if (filterName === 'name') return sortByNameCaseInsensitive(sortAscend)(list)

    return list
  }
  const listFilteredAccordingToSearchQuery = list => list.filter(el => {
    const searchIsActive = el.name.toLowerCase().includes(searchQuery.toLowerCase())

    return (searchIsActive) ? el : false
  })

  return R.compose(listFilteredAccordingToSearchQuery, sortedList)(
    list,
    sortingFilter,
    sortAscend
  )
}

export const filteredHealthcheckList = createSelector(
  getHealthcheckList,
  getSearchQuery,
  getSortingFilter,
  getAscendFilter,
  getFilteredHealthcheckList
)
