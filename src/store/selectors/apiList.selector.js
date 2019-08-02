import { createSelector } from 'reselect'
import R from 'ramda'

const getApiList = state => state.apiListReducer.apiList
const getSearchQuery = state => state.searchReducer.searchQuery
const getSortingFilter = state => state.apiListReducer.sortingFilter
const getAscendFilter = state => state.apiListReducer.sortAscend

const sortByNameCaseInsensitive = asc => R.sort(
  asc
    ? R.ascend(R.compose(R.toLower, R.prop('name')))
    : R.descend(R.compose(R.toLower, R.prop('name')))
)
const sortByActive = asc => R.sort(
  asc
    ? R.ascend(R.prop('active'))
    : R.descend(R.prop('active'))
)

const getFilteredApiList = (apiList, searchQuery, sortingFilter, sortAscend) => {
  const sortedList = (list, filterName, ascend) => {
    switch (filterName) {
      case 'name': {
        return sortByNameCaseInsensitive(sortAscend)(list)
      }
      case 'active': {
        return sortByActive(sortAscend)(list)
      }
      default:
        return list
    }
  }
  const listFilteredAccordingToSearchQuery = list => {
    if (!list.filter) return false

    return list.filter(el => {
      const searchIsActive = el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              el.proxy.listen_path.toLowerCase().includes(searchQuery.toLowerCase())

      return (searchIsActive) ? el : false
    })
  }

  return R.compose(listFilteredAccordingToSearchQuery, sortedList)(
    apiList,
    sortingFilter,
    sortAscend
  )
}

export const filteredApiList = createSelector(
  getApiList,
  getSearchQuery,
  getSortingFilter,
  getAscendFilter,
  getFilteredApiList
)
