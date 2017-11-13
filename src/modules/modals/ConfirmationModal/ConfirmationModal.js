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
    apiName,
    closeModal,
    message,
    needConfirm,
    status,
    title,
    afterCloseConfirmationModal,
    shouldRedirect,
}) => {
    const handleSubmitConfirmation = () =>
        afterCloseConfirmationModal(status, api, apiName, shouldRedirect);

    return (
        <Modal
            show={needConfirm}
            closeModal={closeModal}
            message={message}
            title={title}
            buttons={[
                <Button mod="default" onClick={closeModal}>Cancel</Button>,
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
        apiName,
        message,
        needConfirm,
        shouldRedirect,
        status,
        title,
    } = state.apiResponseModalReducer.confirmationModal;

    return {
        api,
        apiName,
        message,
        needConfirm,
        shouldRedirect,
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
