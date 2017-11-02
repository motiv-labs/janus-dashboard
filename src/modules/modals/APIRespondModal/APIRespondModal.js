import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/Modal/Modal';
import Button from '../../buttons/Button';

const propTypes = {
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    redirectOnClose: PropTypes.func,
};

const defaultProps = {
    message: '',
    statusText: '',
};

const APIRespondModal = ({
    closeModal,
    isOpen,
    message,
    redirectOnClose,
}) => {
    const handleClose = () => {
        closeModal();

        if (redirectOnClose) {
            redirectOnClose();
        }
    };

    return (
        <Modal
            closeModal={handleClose}
            message={message}
            show={isOpen}
            title="Ooops!"
            buttons={[
                <Button mod="primary" onClick={handleClose}>OK</Button>,
            ]}
        />
    );
};

APIRespondModal.propTypes = propTypes;
APIRespondModal.defaultProps = defaultProps;

export default APIRespondModal;
