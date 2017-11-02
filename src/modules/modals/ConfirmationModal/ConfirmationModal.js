import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../../../components/Modal/Modal';
import Button from '../../buttons/Button';

import {
    clearConfirmationModal,
} from '../../../store/actions';

const propTypes = {
    closeModal: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    needConfirm: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

const defaultProps = {
    message: '',
};

const ConfirmationModal = ({
    closeModal,
    message,
    needConfirm,
    onConfirm,
    title,
}) => {
    const handleClose = () => {
        closeModal();
    };

    return (
        <Modal
            show={needConfirm}
            closeModal={handleClose}
            message={message}
            title={title}
            buttons={[
                <Button mod="default" onClick={handleClose}>Cancel</Button>,
                <Button mod="primary" onClick={onConfirm}>OK</Button>,
            ]}
        />
    );
};

ConfirmationModal.propTypes = propTypes;
ConfirmationModal.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    const {
        message,
        needConfirm,
        onConfirm,
        title,
    } = state.apiResponseModalReducer.confirmationModal;

    return {
        message,
        needConfirm,
        onConfirm,
        title,
    };
};

export default connect(
    mapStateToProps,
    {
        closeModal: clearConfirmationModal,
    },
)(ConfirmationModal);
