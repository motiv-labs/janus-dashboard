import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../../../components/Modal/Modal';
import Button from '../../buttons/Button';

import {
    clearConfirmationModal,
    afterCloseConfirmationModal,
} from '../../../store/actions';

const propTypes = {
    closeModal: PropTypes.func.isRequired,
    afterCloseConfirmationModal: PropTypes.func.isRequired,
    needConfirm: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

const defaultProps = {
    message: '',
};

const ConfirmationModal = ({
    api,
    closeModal,
    message,
    needConfirm,
    status,
    title,
    afterCloseConfirmationModal,
}) => {
    const handleClose = () => {
        closeModal();
    };
    console.error('STATUS & Api', status, api);
    const handleSubmitConfirmation = () => {
        afterCloseConfirmationModal(status, api);
    };


    return (
        <Modal
            show={needConfirm}
            closeModal={handleClose}
            message={message}
            title={title}
            buttons={[
                <Button mod="default" onClick={handleClose}>Cancel</Button>,
                <Button mod="primary" onClick={handleSubmitConfirmation}>OK</Button>,
            ]}
        />
    );
};

ConfirmationModal.propTypes = propTypes;
ConfirmationModal.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    const {
        api,
        message,
        needConfirm,
        status,
        title,
    } = state.apiResponseModalReducer.confirmationModal;

    return {
        api,
        message,
        needConfirm,
        status,
        title,
    };
};

export default connect(
    mapStateToProps,
    {
        closeModal: clearConfirmationModal,
        afterCloseConfirmationModal,
    },
)(ConfirmationModal);
