import { connect } from 'react-redux';

import {
  fetchAPIs,
  setCurrentPageIndex,
} from '../../../store/actions';
import { filteredApiList } from '../../../store/selectors';

import ApiList from './ApiList';

const mapStateToProps = (state) => {
  return {
    apiList: filteredApiList(state),
    currentPageIndex: state.apiListReducer.currentPageIndex,
  };
};

export default connect(
  mapStateToProps,
  { fetchAPIs, setCurrentPageIndex },
)(ApiList);
