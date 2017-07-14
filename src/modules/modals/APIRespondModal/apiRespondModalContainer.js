import { connect } from 'react-redux';

import {
  openResponseModal,
  closeResponseModal,
} from '../../../store/actions';
import { filteredApiList } from '../../../store/selectors';

import APIRespondModal from './APIRespondModal';

const mapStateToProps = (state) => {
  const { isOpen, status, message } = state.apiResponseModalReducer;

  return {
    isOpen, status, message,
  };
};

export default connect(
  mapStateToProps,
  { openResponseModal, closeModal: closeResponseModal },
)(APIRespondModal);
