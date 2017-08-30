import React from 'react';
import PropTypes from 'prop-types';
import Modaliz from 'react-modaliz';

const propTypes = {
    className: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    redirectOnClose: PropTypes.func,
    statusText: PropTypes.string.isRequired,
};

const defaultProps = {
    message: '',
    statusText: '',
};

const APIRespondModal = ({
    className,
    closeModal,
    isOpen,
    message,
    redirectOnClose,
    statusText,
}) => {
    const handleClose = () => {
        closeModal();

        if (redirectOnClose) {
            redirectOnClose();
        }
    };

    return (
        <Modaliz
            className={className}
            show={isOpen}
            simple
            speed={500}
            text={message}
            title={statusText}
            onClose={handleClose}
        />
    );
};

APIRespondModal.propTypes = propTypes;
APIRespondModal.defaultProps = defaultProps;

export default APIRespondModal;
