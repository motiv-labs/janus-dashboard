import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/Button/Button';

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
    apiName,
    closeModal,
    message,
    needConfirm,
    status,
    title,
    afterCloseConfirmationModal,
    isRedirect,
}) => {
    const handleSubmitConfirmation = () =>
        afterCloseConfirmationModal(status, api, apiName, isRedirect);

    return (
        <Modal
            show={needConfirm}
            closeModal={closeModal}
            message={message}
            title={title}
            buttons={[
                <Button key="cancel" mod="default" onClick={closeModal}>Cancel</Button>,
                <Button key="ok" mod="primary" onClick={handleSubmitConfirmation}>OK</Button>,
            ]}
        />
    );
};

ConfirmationModal.propTypes = propTypes;
ConfirmationModal.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    const {
        api,
        apiName,
        message,
        needConfirm,
        isRedirect,
        status,
        title,
    } = state.apiResponseModalReducer.confirmationModal;

    return {
        api,
        apiName,
        message,
        needConfirm,
        isRedirect,
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
