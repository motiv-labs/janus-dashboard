import { connect } from 'react-redux';

import {
  openResponseModal,
  closeResponseModal,
} from '../../../store/actions';

import APIRespondModal from './APIRespondModal';

const mapStateToProps = (state) => {
    const { isOpen, status, message, redirectOnClose } = state.apiResponseModalReducer;

    return {
        isOpen, status, message, redirectOnClose,
    };
};

export default connect(
  mapStateToProps,
  { openResponseModal, closeModal: closeResponseModal },
)(APIRespondModal);
