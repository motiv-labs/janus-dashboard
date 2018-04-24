import { connect } from 'react-redux'

import {
  fetchEndpoints,
  refreshEndpoints,
  setCurrentPageIndex,
  setSortingFilter,
  setAscendingFilter,
  confirmAction
} from '../../../store/actions'
import { filteredApiList } from '../../../store/selectors'

import ApiList from './ApiList'

const mapStateToProps = state => ({
  apiList: filteredApiList(state),
  currentPageIndex: state.paginationReducer.currentPageIndex,
  searchQuery: state.searchReducer.searchQuery,
  isAdmin: state.userSessionReducer.isAdmin
})

export default connect(
  mapStateToProps,
  {
    fetchEndpoints,
    refreshEndpoints,
    setCurrentPageIndex,
    setSortingFilter,
    setAscendingFilter,
    confirmAction
  }
)(ApiList)
